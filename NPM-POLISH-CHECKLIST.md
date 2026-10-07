# NPM Package Polish Checklist

## Package Metadata
- [ ] `package.json` has valid semver version
- [ ] `package.json` has accurate description (≤60 chars)
- [ ] `package.json` has correct `main` / `exports` field
- [ ] `package.json` has correct `bin` entry for CLI
- [ ] `package.json` lists all `devDependencies` (not `dependencies`)
- [ ] `package.json` has `keywords` array with 5-10 relevant terms
- [ ] `package.json` has `repository` field pointing to GitHub
- [ ] `package.json` has `homepage` field
- [ ] `package.json` has `bugs` field
- [ ] `package.json` has `author` field with your name and email
- [ ] `package.json` has correct `license` field
- [ ] `package.json` has `files` array excluding `src/`, `*.test.ts`, `node_modules/`
- [ ] `package.json` has `engines.node` set to `">=18"`

## Documentation
- [ ] `README.md` has clear, compelling headline
- [ ] `README.md` includes "Why?" section (the problem)
- [ ] `README.md` includes installation instructions
- [ ] `README.md` includes quick-start example
- [ ] `README.md` includes command reference
- [ ] `README.md` includes output examples (with code blocks)
- [ ] `README.md` includes target-specific usage (cursor, copilot, claude, gemini)
- [ ] `README.md` includes drift-check instructions
- [ ] `README.md` includes `--dry-run` and `--force` flag descriptions
- [ ] `README.md` includes FAQ section
- [ ] `README.md` includes license and copyright notice
- [ ] `README.md` includes link to GitHub issues
- [ ] `README.md` includes link to documentation
- [ ] `CHANGELOG.md` exists with version history
- [ ] `CONTRIBUTING.md` exists (or note in README)

## Code Quality
- [ ] All TypeScript compiles without errors: `npm run build`
- [ ] No console.log or debug code in production files
- [ ] CLI has `--help` or `-h` flag
- [ ] CLI has `--version` or `-v` flag
- [ ] CLI exits with code 0 on success, non-zero on error
- [ ] CLI handles missing arguments gracefully
- [ ] CLI handles invalid targets gracefully
- [ ] CLI handles missing repository gracefully
- [ ] `--dry-run` does not write files
- [ ] `--force` overwrites existing files without prompt
- [ ] Generated files include comment header with generation timestamp
- [ ] No hardcoded paths; all paths are relative

## Files and Structure
- [ ] `dist/` directory exists and contains compiled `.js` and `.d.ts` files
- [ ] `dist/cli.js` has `#!/usr/bin/env node` shebang
- [ ] `LICENSE` file exists and is accurate
- [ ] `.gitignore` excludes `node_modules/`, `dist/`, `*.log`
- [ ] `.npmignore` exists and excludes source files, tests, examples
- [ ] No `.env`, `.env.example`, or secrets in the package
- [ ] No large binary files or media files
- [ ] Package size is reasonable (< 1 MB after `npm pack`)

## Testing and Validation
- [ ] CLI runs without errors: `npx ai-meta-factory init --dry-run`
- [ ] Cursor target works: `npx ai-meta-factory init --target cursor --dry-run`
- [ ] GitHub Copilot target works: `npx ai-meta-factory init --target github-copilot --dry-run`
- [ ] Claude target works: `npx ai-meta-factory init --target claude --dry-run`
- [ ] Gemini target works: `npx ai-meta-factory init --target gemini --dry-run`
- [ ] Generic target works: `npx ai-meta-factory init --target generic --dry-run`
- [ ] Drift check works: `npx ai-meta-factory drift-check`
- [ ] Help output is clear: `npx ai-meta-factory --help`
- [ ] Version output works: `npx ai-meta-factory --version`
- [ ] Works on a sample TypeScript repo
- [ ] Works on a sample Python repo
- [ ] Works on a sample Go repo

## NPM Registry
- [ ] You have an npm account and are logged in: `npm whoami`
- [ ] README preview looks good on npm.js website
- [ ] Keywords are searchable and relevant
- [ ] GitHub link is correct
- [ ] Homepage link is correct
- [ ] Author email is valid
- [ ] No typos in package name or description
- [ ] `npm pack` produces expected file list
- [ ] Publish to npm: `npm publish`
- [ ] Verify package is live: `npm view ai-meta-factory`
- [ ] Verify installation works: `npm install -g ai-meta-factory`
- [ ] Verify CLI is in PATH: `which ai-meta-factory`
- [ ] Test global install: `ai-meta-factory --version`

## Repository
- [ ] GitHub repo has description
- [ ] GitHub repo has website/homepage link
- [ ] GitHub repo has topics/tags
- [ ] GitHub repo has GitHub Actions workflow for CI
- [ ] GitHub repo has branch protection on `main`
- [ ] GitHub repo has issue templates
- [ ] GitHub repo has pull request template
- [ ] GitHub repo has SECURITY.md (optional but recommended)
- [ ] GitHub repo README links to npm package
- [ ] GitHub repo has releases tagged with versions

## Miscellaneous
- [ ] No typos in CLI output messages
- [ ] Error messages are helpful and actionable
- [ ] Success messages are clear
- [ ] File paths in output use forward slashes (Windows-compatible)
- [ ] Generated artifact paths match documented locations
- [ ] Scanner output is deterministic (same repo = same output)
- [ ] Documentation examples are tested and work
- [ ] No dead links in README or docs

## Before Publishing
- [ ] Bump version in `package.json`
- [ ] Update `CHANGELOG.md` with new version and changes
- [ ] Commit and push to GitHub
- [ ] Create a Git tag: `git tag v0.2.0`
- [ ] Push tag: `git push origin v0.2.0`
- [ ] Create a GitHub Release with changelog notes
- [ ] Run `npm publish` (verify you are authenticated)
- [ ] Verify package is live on npm
- [ ] Announce on LinkedIn, Twitter, GitHub Discussions

## Post-Publish
- [ ] Monitor npm package page for issues
- [ ] Respond to issues on GitHub
- [ ] Track download metrics
- [ ] Collect user feedback
- [ ] Plan next features based on feedback
