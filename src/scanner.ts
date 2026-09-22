import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import type { RepoContext } from './types.js';

const ignored = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage', '.next', '.venv']);

function files(root: string, depth = 0): string[] {
  if (depth > 4) return [];
  const result: string[] = [];
  for (const entry of readdirSync(root)) {
    if (ignored.has(entry)) continue;
    const absolute = join(root, entry);
    const stat = statSync(absolute);
    if (stat.isDirectory()) {
      result.push(...files(absolute, depth + 1));
    } else {
      result.push(relative(process.cwd(), absolute).replaceAll('\\', '/'));
    }
  }
  return result;
}

function read(root: string, name: string): string | null {
  try {
    return readFileSync(join(root, name), 'utf8');
  } catch {
    return null;
  }
}

function detectLanguage(paths: string[]): string[] {
  const map: Record<string, string> = {
    '.ts': 'TypeScript',
    '.tsx': 'TypeScript',
    '.js': 'JavaScript',
    '.jsx': 'JavaScript',
    '.py': 'Python',
    '.go': 'Go',
    '.rs': 'Rust',
    '.java': 'Java',
    '.cs': 'C#',
    '.rb': 'Ruby'
  };

  const result = new Set<string>();
  for (const path of paths) {
    const ext = path.includes('.') ? path.slice(path.lastIndexOf('.')) : '';
    const detected = map[ext];
    if (detected) result.add(detected);
  }
  return [...result].sort();
}

function packageJson(root: string): { name?: string; description?: string; scripts?: Record<string, string>; packageManager?: string } {
  try {
    return JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  } catch {
    return {};
  }
}

export function scan(root: string): RepoContext {
  const paths = files(root);
  const pkg = packageJson(root);
  const languages = detectLanguage(paths);
  const dirs = [...new Set(paths.map((p) => p.split('/')[0]).filter((p) => !p.includes('.') && p.length > 0))].sort();
  const entryPoints = paths.filter((p) => /(^|\/)(index|main|app|server)\.(ts|tsx|js|jsx|py|go|rs)$/.test(p)).slice(0, 10);
  const scripts = pkg.scripts ?? {};
  const frameworks = [
    ...(pkg.dependencies ? Object.keys(pkg.dependencies).filter((name) => ['react', 'next', 'express', 'fastify', 'nestjs', 'vue', 'angular'].some((token) => name.includes(token))) : []),
    ...(read(root, 'pyproject.toml')?.match(/(?:django|fastapi|flask|pytest)/gi) ?? [])
  ];
  const testFiles = paths.filter((p) => /(test|spec)\.(ts|tsx|js|jsx|py|go)$/.test(p));

  const packageManager = pkg.packageManager ?? (
    read(root, 'package-lock.json') ? 'npm' :
    read(root, 'pnpm-lock.yaml') ? 'pnpm' :
    read(root, 'yarn.lock') ? 'yarn' :
    null
  );

  return {
    repository: {
      name: pkg.name ?? root.split('/').pop() ?? 'repository',
      description: pkg.description ?? null,
      primaryLanguage: languages[0] ?? null,
      languages
    },
    stack: {
      frameworks: [...new Set(frameworks)].sort(),
      packageManager,
      runtime: languages.includes('TypeScript') || languages.includes('JavaScript') ? 'Node.js' : null
    },
    structure: {
      directories: dirs,
      entryPoints
    },
    conventions: {
      files: languages.length ? 'Observe existing file naming and preserve repository conventions.' : null,
      tests: testFiles.length ? `${testFiles.length} test-like files detected.` : null
    },
    commands: {
      build: scripts.build ?? null,
      test: scripts.test ?? null,
      dev: scripts.dev ?? scripts.start ?? null
    },
    constraints: [
      'Generated artifacts must remain evidence-backed.',
      'Do not overwrite user-authored files without explicit confirmation.'
    ],
    generatedAt: new Date().toISOString()
  };
}
