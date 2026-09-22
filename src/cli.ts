#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { render, targets } from './adapters.js';
import { scan } from './scanner.js';
import type { Target } from './types.js';

const args = process.argv.slice(2);
const command = args[0] ?? 'init';
const targetIndex = args.indexOf('--target');
const target = (targetIndex >= 0 ? args[targetIndex + 1] : 'all') as Target;
const pathIndex = args.indexOf('--path');
const root = resolve(pathIndex >= 0 ? args[pathIndex + 1] : '.');
const dryRun = args.includes('--dry-run');
const force = args.includes('--force');

if (!['init', 'generate', 'drift-check'].includes(command)) {
  console.error('Usage: ai-meta-factory init|generate|drift-check [--target target] [--dry-run] [--force]');
  process.exit(1);
}

const context = scan(root);

if (command === 'drift-check') {
  const generated = render(context, 'generic').find((file) => file.path === '.ai-context/repo-context.json');
  const actualPath = join(root, '.ai-context/repo-context.json');
  const drifted = !existsSync(actualPath) || readFileSync(actualPath, 'utf8') !== generated?.content;
  console.log(drifted ? 'DRIFT: generated context is missing or outdated.' : 'OK: generated context matches the repository scan.');
  process.exit(drifted ? 2 : 0);
}

for (const selected of targets(target)) {
  for (const file of render(context, selected)) {
    const destination = join(root, file.path);
    const directory = destination.slice(0, destination.lastIndexOf('/'));
    if (existsSync(destination) && !force) {
      console.log(`SKIP ${file.path} (exists; use --force to replace)`);
      continue;
    }
    if (dryRun) {
      console.log(`WOULD WRITE ${file.path}`);
      continue;
    }
    mkdirSync(directory, { recursive: true });
    writeFileSync(destination, file.content);
    console.log(`WRITE ${file.path}`);
  }
}
