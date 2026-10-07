# ai-meta-factory CLI

This CLI is the installable entry point for the multi-AI context generator.

## Install and use

```bash
npm install
npm run build
```

### Commands

#### Initialize Repository Context (Default)
```bash
node dist/cli.js init [--target all|cursor|github-copilot|claude|gemini|generic]
node dist/cli.js init --target cursor
node dist/cli.js init --target all --force
```

Generates platform-specific context files and canonical `repo-context.yaml`.

#### Run Prompt Stages Pipeline
```bash
# Run all stages for a specific target
node dist/cli.js prompt --target cursor --stage all
node dist/cli.js prompt --target claude --stage all
node dist/cli.js prompt --target github-copilot --stage all

# Run all stages for all targets (sequentially)
node dist/cli.js prompt --target all --stage all

# Run individual stages
node dist/cli.js prompt --target cursor --stage scanner
node dist/cli.js prompt --target claude --stage architecture
node dist/cli.js prompt --target generic --stage standards
```

**Stage Descriptions:**
1. **scanner** — Analyzes repository and produces canonical `repo-context.yaml`
2. **context-generator** — Generates quick-reference context files (target-specific)
3. **architecture** — Documents module boundaries and architecture decisions (target-specific)
4. **standards** — Creates coding standards and conventions (target-specific)
5. **tests** — Defines testing patterns and requirements (target-specific)
6. **drift-check** — Validates context consistency (common)
7. **claudemd** — Generates AI behavioral guidelines (target-specific)

**Key Feature:** Each stage generates output according to the target's conventions:
- **Cursor**: `.cursor/rules/*.mdc` (YAML frontmatter format)
- **GitHub Copilot**: `.github/*.md`
- **Claude**: Root-level `.md` files + `.claude/instructions.md`
- **Gemini**: `gemini-*.json` (JSON format)
- **Generic**: `.ai-context/*.md` (tool-agnostic Markdown)

#### Check Context Drift
```bash
node dist/cli.js drift-check
```

Validates that generated context matches current repository scan.

### Flags

- `--target [cursor|github-copilot|claude|gemini|generic|all]` — For `init` and `prompt` commands (default: `all`)
- `--stage [scanner|context-generator|architecture|standards|tests|drift-check|claudemd|all]` — For `prompt` command (default: `all`)
- `--path <directory>` — Repository root (default: current directory)
- `--dry-run` — Preview changes without writing files
- `--force` — Overwrite existing files

### Examples

```bash
# Initialize all platform contexts
node dist/cli.js init --target all

# Generate all artifacts for Cursor IDE
node dist/cli.js prompt --target cursor --stage all

# Generate architecture documentation for Claude
node dist/cli.js prompt --target claude --stage architecture

# Generate standards for all targets
node dist/cli.js prompt --target all --stage standards

# Preview what would be generated
node dist/cli.js prompt --target cursor --stage all --dry-run

# Regenerate with force overwrite
node dist/cli.js prompt --target all --stage all --force

# Check if context needs regeneration
node dist/cli.js drift-check
```

### Output Structure by Target

**Cursor IDE:**
- `.cursor/rules/000-project-context.mdc`
- `.cursor/rules/100-typescript-standards.mdc`
- `.cursor/rules/200-architecture.mdc`
- `.cursor/rules/300-test-conventions.mdc`
- `.cursor/rules/900-claude-instructions.mdc`

**GitHub Copilot:**
- `.github/copilot-instructions.md`
- `.github/architecture.md`
- `.github/standards.md`
- `.github/test-conventions.md`

**Claude:**
- `CLAUDE.md`
- `ARCHITECTURE.md`
- `STANDARDS.md`
- `TEST-CONVENTIONS.md`
- `.claude/instructions.md`

**Gemini:**
- `gemini-context.json`
- `gemini-architecture.json`
- `gemini-standards.json`
- `gemini-tests.json`

**Generic (Tool-Agnostic):**
- `.ai-context/repo-context.json`
- `.ai-context/context-generator.md`
- `.ai-context/architecture.md`
- `.ai-context/standards.md`
- `.ai-context/test-conventions.md`
- `.ai-context/ai-instructions.md`
- `.ai-context/drift-check.json`

**Common to All:**
- `meta/factory/repo-context.yaml` — Single source of truth

### Workflow

**Initial Setup:**
```bash
# 1. Generate all artifacts for all targets
node dist/cli.js prompt --target all --stage all

# 2. Review generated files in target-specific directories

# 3. Commit artifacts
git add meta/factory/repo-context.yaml .cursor/ .github/ .claude/ .ai-context/ gemini-*.json *.md
git commit -m "chore: generate AI context artifacts"
```

**After Repository Changes:**
```bash
# 1. Check for drift
node dist/cli.js drift-check

# 2. If drift detected, regenerate specific stages
node dist/cli.js prompt --target all --stage all --force

# 3. Review changes and commit
git commit -am "chore: refresh AI context artifacts"
```

**Target-Specific Setup:**
```bash
# Cursor IDE only
node dist/cli.js prompt --target cursor --stage all

# GitHub Copilot only
node dist/cli.js prompt --target github-copilot --stage all

# Claude only
node dist/cli.js prompt --target claude --stage all

# Generic (no tool-specific dependencies)
node dist/cli.js prompt --target generic --stage all
```
