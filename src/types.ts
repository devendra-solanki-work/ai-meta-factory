export type Target = 'cursor' | 'github-copilot' | 'claude' | 'gemini' | 'generic' | 'all';

export interface RepoContext {
  repository: {
    name: string;
    description: string | null;
    primaryLanguage: string | null;
    languages: string[];
  };
  stack: {
    frameworks: string[];
    packageManager: string | null;
    runtime: string | null;
  };
  structure: {
    directories: string[];
    entryPoints: string[];
  };
  conventions: {
    files: string | null;
    tests: string | null;
  };
  commands: {
    build: string | null;
    test: string | null;
    dev: string | null;
  };
  constraints: string[];
  generatedAt: string;
}

export interface RenderedFile {
  path: string;
  content: string;
}
