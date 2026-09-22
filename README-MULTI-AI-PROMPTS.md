# Multi-AI Tool Prompts — Complete Guide

This directory structure contains adapted prompts for four major AI coding assistants, each optimized for their specific APIs, capabilities, and integration patterns.

## Overview

The `meta/` directory now contains tool-specific subdirectories:

```
meta/
├── factory/          # Original prompts (base templates)
├── cursor/           # Cursor AI-optimized prompts
├── claude/           # Claude (Anthropic) optimized prompts
├── github-copilot/   # GitHub Copilot optimized prompts
└── gemini/           # Google Gemini optimized prompts
```

## Tool-Specific Directories

### 1. **meta/cursor/** — Cursor AI Integration

**Best for:** VS Code extension with rules-based system.

**Files:**
- `000-context-generator.prompt` — Generates `.cursor/rules/000-project-context.mdc`
- `architecture.prompt` — Creates `.cursor/rules/200-architecture.mdc`
- `claudemd.prompt` — Generates `CLAUDE.md` for Claude integration
- `scanner.prompt` — YAML-based codebase snapshot
- `drift-check.prompt` — Detects changes between snapshots
- `standards.prompt` — Language-specific coding standards
- `tests.prompt` — Test generation patterns

**Output Format:** `.mdc` files (Markdown with YAML frontmatter)
**Context:** Rules-based, always-applied patterns
**Focus:** Aggressive brevity, lookup-table style

---

### 2. **meta/claude/** — Claude (Anthropic) Integration

**Best for:** Rich reasoning, narrative context, API integration.

**Files:**
- `000-context-generator.prompt` — Comprehensive `CLAUDE.md` with full rationale
- `architecture.prompt` — Detailed architecture document with trade-offs
- `standards.prompt` — Coding standards with reasoning for each rule
- `tests.prompt` — Test conventions with explanations
- `scanner.prompt` — YAML schema for Claude analysis

**Output Format:** Markdown documents with narrative flow
**Context:** Comprehensive with reasoning and rationale
**Focus:** Explanation-rich, rationale for every rule

---

### 3. **meta/github-copilot/** — GitHub Copilot Integration

**Best for:** VS Code workspace context, quick reference, inline code completion.

**Files:**
- `000-context-generator.prompt` — Generates `.github/copilot-context.md`
- `architecture.prompt` — Creates `.github/ARCHITECTURE.md`
- `standards.prompt` — Generates `.github/CODING-STANDARDS.md`
- `tests.prompt` — Generates `.github/TEST-CONVENTIONS.md`
- `scanner.prompt` — YAML schema for Copilot context

**Output Format:** Markdown in `.github/` directory
**Context:** Workspace-aware, scannable references
**Focus:** Quick lookup, actionable patterns

---

### 4. **meta/gemini/** — Google Gemini Integration

**Best for:** Gemini API integration, structured data, multi-turn conversations.

**Files:**
- `000-context-generator.prompt` — Generates `gemini-context.json`
- `architecture.prompt` — Creates `gemini-architecture.json` with structured relationships
- `standards.prompt` — Generates `gemini-standards.json`
- `tests.prompt` — Generates `gemini-tests.json`
- `scanner.prompt` — YAML/JSON schema for Gemini

**Output Format:** JSON for API integration
**Context:** Structured data, relationship mapping
**Focus:** API-optimized, JSON formatting

---

## Key Differences by Tool

| Aspect | Cursor | Claude | GitHub Copilot | Gemini |
|--------|--------|--------|-----------------|--------|
| **Primary Format** | `.mdc` (Markdown) | Markdown | Markdown | JSON |
| **Context Style** | Terse, lookup tables | Rich narrative | Scannable reference | Structured data |
| **Tone** | Imperative, facts only | Reasoning-focused | Action-oriented | API-optimized |
| **Output Location** | `.cursor/rules/` | Root markdown | `.github/` | JSON files |
| **Rationale Inclusion** | Minimal | Comprehensive | Moderate | Moderate |
| **Best For** | Rules application | Deep understanding | Code completion | API integration |

---

## Prompt File Purposes

### `000-context-generator.prompt`
- **Purpose:** Generate quick project reference
- **Cursor:** ≤50 lines, aggressive brevity
- **Claude:** 1000-2000 words, comprehensive with rationale
- **Copilot:** 300-500 words, workspace-focused
- **Gemini:** JSON structure, API-ready

### `architecture.prompt`
- **Purpose:** Document system design and module boundaries
- **Cursor:** Rules format with boundary definitions
- **Claude:** Narrative with trade-offs and reasoning
- **Copilot:** Quick reference with dependency rules
- **Gemini:** JSON with relationship mapping

### `standards.prompt`
- **Purpose:** Define coding conventions and patterns
- **Cursor:** Imperative rules with examples
- **Claude:** Standards with reasoning for each
- **Copilot:** Quick reference card format
- **Gemini:** Structured JSON with examples

### `tests.prompt`
- **Purpose:** Guide test generation and conventions
- **Cursor:** Structure, naming, anti-patterns
- **Claude:** Comprehensive with explanations
- **Copilot:** Pattern reference with examples
- **Gemini:** Structured conventions and commands

### `scanner.prompt`
- **Purpose:** Audit codebase and produce snapshot
- **Cursor:** YAML schema, cursor-specific
- **Claude:** YAML for analysis
- **Copilot:** YAML with workspace focus
- **Gemini:** YAML/JSON schema for Gemini

### `drift-check.prompt` (Cursor only)
- **Purpose:** Detect changes between artifact versions
- **Output:** XML-formatted drift report

### `claudemd.prompt` (Cursor only)
- **Purpose:** Distill rules into single Claude.md file
- **Output:** Concise 200-word summary

---

## Usage Guide

### For Cursor AI Users
```bash
# Use prompts from meta/cursor/
# They generate .mdc files in .cursor/rules/
# Example:
cat meta/factory/repo-context.yaml | \
  cursor-run meta/cursor/000-context-generator.prompt
```

### For Claude API Users
```bash
# Use prompts from meta/claude/
# They generate comprehensive Markdown documents
# Include the prompt in your API call for full context
```

### For GitHub Copilot Users
```bash
# Use prompts from meta/github-copilot/
# Generate files in .github/ directory
# Copilot auto-reads these during workspace initialization
```

### For Gemini API Users
```bash
# Use prompts from meta/gemini/
# They generate JSON for direct API integration
# Include JSON context in system_instruction or messages
```

---

## Implementation Strategy

### Step 1: Choose Your AI Tool
Identify which AI assistant you're using (Cursor, Claude, Copilot, or Gemini).

### Step 2: Run Scanner
Execute the scanner prompt to generate `repo-context.yaml`:
```bash
# Replace {tool} with: cursor | claude | github-copilot | gemini
cat your-repo-scan | {tool}-run meta/{tool}/scanner.prompt > repo-context.yaml
```

### Step 3: Generate Context Documents
Run the context generators:
```bash
cat repo-context.yaml | {tool}-run meta/{tool}/000-context-generator.prompt
```

### Step 4: Generate Specialized Prompts
For architecture, standards, and tests:
```bash
cat repo-context.yaml | {tool}-run meta/{tool}/architecture.prompt
cat repo-context.yaml | {tool}-run meta/{tool}/standards.prompt
cat repo-context.yaml | {tool}-run meta/{tool}/tests.prompt
```

### Step 5: Integrate Into Your Workflow
- **Cursor:** Place `.mdc` files in `.cursor/rules/`
- **Claude:** Include markdown files in system context
- **Copilot:** Place markdown files in `.github/`
- **Gemini:** Include JSON in API calls

---

## File Structure Example

After running all prompts for a project, your structure looks like:

```
project-root/
├── .cursor/rules/
│   ├── 000-project-context.mdc
│   ├── 200-architecture.mdc
│   ├── 100-typescript-standards.mdc
│   └── 300-test-conventions.mdc
├── .github/
│   ├── copilot-context.md
│   ├── ARCHITECTURE.md
│   ├── CODING-STANDARDS.md
│   └── TEST-CONVENTIONS.md
├── CLAUDE.md                      # For Claude
├── gemini-context.json            # For Gemini API
├── gemini-architecture.json
├── gemini-standards.json
├── gemini-tests.json
└── meta/
    ├── factory/
    │   └── repo-context.yaml       # Source of truth
    ├── cursor/
    ├── claude/
    ├── github-copilot/
    └── gemini/
```

---

## Customization

Each tool's prompts are **template-based**. Customize by:

1. **Editing prompt files** in the tool-specific directories
2. **Adjusting output schemas** for your project needs
3. **Adding tool-specific sections** (e.g., VS Code settings for Copilot)
4. **Modifying validation rules** based on your standards

---

## Maintenance

### Drift Detection
Regularly check if your codebase has drifted from documented patterns:
```bash
# Cursor only
cat repo-context.yaml | cursor-run meta/cursor/drift-check.prompt
```

### Regeneration
When significant changes occur:
1. Re-run the scanner to generate updated `repo-context.yaml`
2. Re-run all context generators for your chosen tool
3. Replace old context files with new ones

---

## FAQ

**Q: Can I use multiple AI tools simultaneously?**
A: Yes! Generate context for all tools. Each tool reads its own format.

**Q: What if my project uses multiple languages?**
A: Scanners auto-detect all languages. Standards prompts generate per-language documents.

**Q: How often should I regenerate context?**
A: After major architectural changes or quarterly review.

**Q: Can I mix prompts between tools?**
A: Not recommended. Each tool's prompts are optimized for that tool's capabilities.

**Q: What's the difference between `meta/factory/` and `meta/{tool}/` prompts?**
A: `factory/` contains original prompts (base). `{tool}/` contains adapted versions for specific AI assistants.

---

## Contributing

If you improve prompts for your use case:
1. Test thoroughly with your AI tool
2. Verify output matches the tool's expected format
3. Document any tool-specific customizations
4. Submit a pull request with examples

---

## Branch Information

This feature was implemented in branch: `feat/multi-ai-tool-prompts`

**Commits:**
- `fc1cc56` — Cursor prompts
- `b2832a5` — Claude prompts
- `03d7a06` — GitHub Copilot prompts
- `194d5b6` — Gemini prompts

---

## Next Steps

1. Choose your primary AI tool
2. Run prompts from that tool's directory
3. Review generated context documents
4. Integrate into your development workflow
5. Share feedback and improvements

---

**Last Updated:** 2026-09-13
**Version:** 1.0
