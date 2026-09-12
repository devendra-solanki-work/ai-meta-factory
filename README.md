# ai-meta-factory

**Build consistent repository context for AI agents.**

A meta-factory that generates structured project context artifacts from repository scans. These artifacts empower AI agents with accurate, repository-specific guidance, eliminating guesswork and ensuring consistent responses.

## What is this?

`ai-meta-factory` is a system for generating and maintaining AI-friendly documentation artifacts. Instead of relying on AI agents to infer your project's structure, conventions, and constraints from raw code, this factory produces standardized, concise reference files that:

- **Ground AI agents** in your project's actual architecture
- **Enforce consistency** across all agent interactions
- **Reduce hallucination** by providing authoritative facts
- **Speed up onboarding** for new developers and AI assistants

## How it works

The factory operates in stages:

1. **Scanner** (`meta/factory/scanner.prompt`)
   - Analyzes repository structure, languages, frameworks, and conventions
   - Produces `repo-context.yaml` — the master source of truth

2. **Context Generator** (`meta/factory/000-context-generator.prompt`)
   - Transforms scanner output into `.cursor/rules/000-project-context.mdc`
   - Compact lookup table: stack, entry points, directories, constraints, naming conventions

3. **Architecture Documenter** (`meta/factory/architecture.prompt`)
   - Generates `.cursor/rules/200-architecture.mdc` — module boundaries and dependency rules
   - Produces `docs/adr/ADR-000-initial-architecture.md` — architecture decisions

4. **Standards & Tests** (`meta/factory/standards.prompt`, `tests.prompt`)
   - Coding standards: `.cursor/rules/100-*-standards.mdc`
   - Test conventions: `.cursor/rules/300-test-conventions.mdc`

5. **Drift Check** (`meta/factory/drift-check.prompt`)
   - Validates that actual codebase matches generated context
   - Flags architectural violations and outdated documentation

6. **Claude Markdown** (`meta/factory/claudemd.prompt`)
   - Generates `.cursor/rules/900-claude-instructions.mdc`
   - Custom behavioral rules and tone guidance for AI assistants

## Output artifacts

All generated files live in `.cursor/rules/` and `docs/` — optimized for AI context windows:

| Artifact | Purpose | Lines |
|----------|---------|-------|
| `000-project-context.mdc` | Quick reference (stack, entry points, directories) | ≤50 |
| `100-*-standards.mdc` | Coding standards & conventions | Modular |
| `200-architecture.mdc` | Module map, dependency rules, constraints | ≤30 |
| `300-test-conventions.mdc` | Testing patterns and requirements | Concise |
| `900-claude-instructions.mdc` | Custom AI behavior and tone | Brief |
| `docs/adr/ADR-*.md` | Architecture Decision Records | Linked |

## Core principles

1. **Terse over friendly** — Every token matters in an AI context window
2. **Facts over prose** — Lookup tables, not essays
3. **Observable evidence** — All patterns backed by real code
4. **Sanctioned constraints** — Only document things that break if violated
5. **Single source of truth** — Scanner output is canonical

## Design philosophy

This factory treats AI agents as first-class participants in development:

- **Agents need context, not tutorials** — No "here's what TypeScript is"
- **Agents need boundaries, not guidelines** — Hard rules, not best practices
- **Agents need signals, not noise** — Facts compressed to essentials
- **Agents need consistency** — One source of truth for all interactions

## Who is this for?

- **Teams using AI coding agents** (GitHub Copilot, Claude, etc.)
- **Projects that want consistent AI-assisted development**
- **Organizations scaling AI-driven workflows** across multiple repositories

## Implementation

See [`artifact-factory-team-runbook.docx`](artifact-factory-team-runbook.docx) for detailed implementation guides and team workflows.

## Getting started

1. Run the scanner prompt on your repository
2. Generate initial artifacts using factory prompts
3. Integrate `.cursor/rules/` into your Cursor/IDE configuration
4. Run periodic drift checks to keep context fresh

---

**License:** See repository for license information  
**Status:** Active development
