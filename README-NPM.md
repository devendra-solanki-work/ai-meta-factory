# ai-meta-factory

[![npm version](https://img.shields.io/npm/v/ai-meta-factory.svg)](https://www.npmjs.com/package/ai-meta-factory)
[![npm downloads](https://img.shields.io/npm/dm/ai-meta-factory.svg)](https://www.npmjs.com/package/ai-meta-factory)
[![License](https://img.shields.io/badge/license-SEE%20LICENSE-blue.svg)](LICENSE)

**Stop AI agents from hallucinating your repository structure.**

Generates repository-aware context for GitHub Copilot, Cursor, Claude, Gemini, and any AI coding tool. Eliminates guesswork. Enforces consistency. Reduces hallucination.

## Why?

AI agents (GitHub Copilot, Claude, Cursor) are powerful but unreliable when they don't understand your project structure, naming conventions, and architectural constraints.

**Problem:**
- Copilot suggests code that violates your architecture
- Claude invents missing details instead of asking
- Cursor applies rules inconsistently across your codebase
- New developers and AI agents start from zero every time

**Solution:**
Scan your repository once. Generate context artifacts. Inject them into your AI workflow. Done.

## Install

```bash
npm install -g ai-meta-factory
# or
npx ai-meta-factory init
```

## Quick Start

```bash
# Generate context for all tools
ai-meta-factory init --target all

# Or generate for a specific tool
ai-meta-factory init --target cursor
ai-meta-factory init --target github-copilot
ai-meta-factory init --target claude
ai-meta-factory init --target gemini

# Preview without writing files
ai-meta-factory init --target all --dry-run

# Replace existing files
ai-meta-factory init --target cursor --force

# Check if repository has drifted from context
ai-meta-factory drift-check
```

## What It Does

**Scans your repository** to detect:
- Languages and frameworks
- Entry points and directory structure
- Package managers and build commands
- Testing frameworks and patterns
- Naming conventions

**Generates tool-specific context:**

| Tool | Output | Location |
|------|--------|----------|
| **Cursor** | Rules + Quick Reference | `.cursor/rules/000-project-context.mdc` |
| **GitHub Copilot** | Instructions | `.github/copilot-instructions.md` |
| **Claude** | Comprehensive Context | `CLAUDE.md` |
| **Gemini** | Structured JSON | `gemini-context.json` |
| **Generic** | Tool-Neutral JSON | `.ai-context/repo-context.json` |

**Stays synchronized** with automated drift detection in CI/CD.

## Usage by Tool

### Cursor IDE

```bash
ai-meta-factory init --target cursor
```

Generated `.cursor/rules/000-project-context.mdc` is automatically loaded by Cursor. All your AI interactions now have project context.

### GitHub Copilot

```bash
ai-meta-factory init --target github-copilot
```

Generated `.github/copilot-instructions.md` is read by Copilot in VS Code. Copilot suggestions respect your architecture and conventions.

### Claude (Anthropic)

```bash
ai-meta-factory init --target claude
```

Generated `CLAUDE.md` is your system prompt. Include it when you start a Claude conversation about your codebase.

**Optional:** Install the Claude Code plugin.

```bash
pip install ai-meta-factory[claude]
```

Then use `/repository-context` in Claude Code to refresh context automatically.

### Google Gemini

```bash
ai-meta-factory init --target gemini
```

Generated `gemini-context.json` is API-ready. Include it in your Gemini API calls:

```javascript
const context = require('./gemini-context.json');
const response = await client.generateContent({
  systemInstruction: context.systemPrompt,
  contents: userMessage
});
```

### Any AI Tool (Generic)

```bash
ai-meta-factory init --target generic
```

Generated `.ai-context/repo-context.json` is tool-neutral. Use it with Continue, Cline, Roo Code, or any AI agent.

## Commands

### `ai-meta-factory init`

Scans repository and generates context artifacts.

**Options:**
- `--target <target>` — Generate for one or more targets. Options: `cursor`, `github-copilot`, `claude`, `gemini`, `generic`, `all`. Default: `all`.
- `--path <path>` — Path to repository. Default: current directory.
- `--dry-run` — Preview files without writing.
- `--force` — Overwrite existing generated files.

**Examples:**

```bash
ai-meta-factory init --target cursor --dry-run
ai-meta-factory init --target cursor,github-copilot --force
ai-meta-factory init --path ~/my-repo --target all
```

### `ai-meta-factory drift-check`

Validates that repository structure matches generated context. Returns exit code 0 if context is current, 2 if drifted.

**Options:**
- `--path <path>` — Path to repository. Default: current directory.

**Examples:**

```bash
ai-meta-factory drift-check
ai-meta-factory drift-check --path ~/my-repo
```

### `ai-meta-factory --help`

Show all commands and options.

### `ai-meta-factory --version`

Show version.

## CI/CD Integration

### GitHub Actions

Add to `.github/workflows/context-drift.yml`:

```yaml
name: Context Drift Check
on:
  pull_request:
  schedule:
    - cron: '0 6 * * 1'
jobs:
  drift:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npx ai-meta-factory drift-check
```

Now every PR and weekly will validate that repository structure hasn't drifted from documented context.

## Examples

### TypeScript Project

```bash
ai-meta-factory init --target cursor
cat .cursor/rules/000-project-context.mdc
```

Output:

```markdown
---
alwaysApply: true
name: "000-project-context"
description: "Generated repository reference"
---

# my-project — Project Context

- Languages: TypeScript, JavaScript
- Runtime: Node.js
- Frameworks: Express, React
- Entry points: src/index.ts, src/server.ts
- Directories: src, tests, docs, config
- Constraints: Generated artifacts must remain evidence-backed.
```

### Python Project

```bash
ai-meta-factory init --target claude
cat CLAUDE.md
```

Output:

```markdown
<!-- Generated by ai-meta-factory; context abc123. Do not edit manually. -->

# my-project — Project Context

- Languages: Python
- Runtime: Python 3.11+
- Frameworks: FastAPI, SQLAlchemy
- Entry points: main.py, api/server.py
- Directories: src, tests, migrations, docs
```

### Multi-Repo Organization

```bash
for repo in ~/repos/*; do
  echo "Scanning $repo..."
  cd "$repo"
  ai-meta-factory init --target cursor --force
done
```

Now all your projects have consistent Cursor rules.

## FAQ

**Q: Does this call an AI API?**  
A: No. The scanner is deterministic and local. No external calls.

**Q: Can I customize the generated context?**  
A: Yes. Edit the generated files directly. They're marked as auto-generated, but you can modify them after creation.

**Q: How often should I regenerate?**  
A: After major architectural changes or quarterly. Use `ai-meta-factory drift-check` to detect when regeneration is needed.

**Q: Does this work with monorepos?**  
A: Run `ai-meta-factory init` from each package root, or loop through subdirectories.

**Q: Can I use this without a tool-specific target?**  
A: Yes. Use `--target generic` to generate tool-neutral context.

**Q: What if my repository is private?**  
A: Works the same. The scanner is local and doesn't access GitHub or any remote service.

**Q: Does this work offline?**  
A: Yes. Completely offline.

**Q: Can I version control the generated files?**  
A: Yes. They're marked as generated but safe to commit. Add them to Git and regenerate periodically.

**Q: What license is this under?**  
A: See [LICENSE](LICENSE). Commercial use requires a separate commercial license.

## License

The project is available under the [AI Meta Factory Non-Commercial License](LICENSE).

Personal, educational, academic, research, and evaluation use is permitted subject to the license terms.

**Commercial use requires a separate written commercial license.**

For commercial licensing inquiries, open an issue or contact the maintainers.

## Contributing

We welcome contributions. Please open an issue or pull request.

## Support

- **Issues:** [GitHub Issues](https://github.com/devendra-solanki-work/ai-meta-factory/issues)
- **Discussions:** [GitHub Discussions](https://github.com/devendra-solanki-work/ai-meta-factory/discussions)
- **Security:** See [SECURITY.md](SECURITY.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release notes.

---

**Made with ❤️ by [Devendra Solanki](https://github.com/devendra-solanki-work)**
