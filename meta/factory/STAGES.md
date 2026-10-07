# Prompt Stages Architecture

The ai-meta-factory operates as a multi-stage pipeline for generating AI-contextual artifacts tailored to each AI tool's conventions and expectations.

## Key Design Principle

**Each stage is target-aware:** Artifacts are generated according to the specific AI tool's conventions rather than forcing a single standardized format.

## Pipeline Overview

Each stage is independent yet sequential, with clear inputs and outputs. Stages can be executed individually or as part of a complete pipeline.

### Stage 1: Scanner (Common)
**Function:** `stageScanner()`
**Output:** `meta/factory/repo-context.yaml`
**Targets:** All
**Purpose:** Analyze repository structure, languages, frameworks, and conventions.
**Type:** Single source of truth — canonical repository metadata

### Stage 2: Context Generator (Target-Specific)
**Functions:**
- `contextGeneratorCursor()` → `.cursor/rules/000-project-context.mdc`
- `contextGeneratorGithubCopilot()` → `.github/copilot-instructions.md`
- `contextGeneratorClaude()` → `CLAUDE.md`
- `contextGeneratorGemini()` → `gemini-context.json`
- `contextGeneratorGeneric()` → `.ai-context/repo-context.json` + `.ai-context/context-generator.md`

**Purpose:** Transform scanner output into quick-reference context lookup tables.
**Format:** Markdown with YAML frontmatter (Cursor), plain Markdown, or JSON

### Stage 3: Architecture (Target-Specific)
**Functions:**
- `architectureCursor()` → `.cursor/rules/200-architecture.mdc`
- `architectureGithubCopilot()` → `.github/architecture.md`
- `architectureClaude()` → `ARCHITECTURE.md`
- `architectureGemini()` → `gemini-architecture.json`
- `architectureGeneric()` → `.ai-context/architecture.md`

**Purpose:** Document module boundaries and dependency rules.
**Audience:** Developers and AI agents
**Content:** Module map, architectural constraints, entry points

### Stage 4: Standards (Target-Specific)
**Functions:**
- `standardsCursor()` → `.cursor/rules/100-typescript-standards.mdc`
- `standardsGithubCopilot()` → `.github/standards.md`
- `standardsClaude()` → `STANDARDS.md`
- `standardsGemini()` → `gemini-standards.json`
- `standardsGeneric()` → `.ai-context/standards.md`

**Purpose:** Define coding standards and conventions.
**Content:** File naming, code style, import organization, documentation

### Stage 5: Tests (Target-Specific)
**Functions:**
- `testsCursor()` → `.cursor/rules/300-test-conventions.mdc`
- `testsGithubCopilot()` → `.github/test-conventions.md`
- `testsClaude()` → `TEST-CONVENTIONS.md`
- `testsGemini()` → `gemini-tests.json`
- `testsGeneric()` → `.ai-context/test-conventions.md`

**Purpose:** Define testing patterns and requirements.
**Content:** Test structure, patterns, coverage requirements

### Stage 6: Drift Check (Common)
**Function:** `stageDriftCheck()`
**Output:** `.ai-context/drift-check.json`
**Targets:** All
**Purpose:** Validate that generated context matches repository state.
**Type:** CI/CD-ready validation output

### Stage 7: Claude Markdown (Target-Specific)
**Functions:**
- `claudemdClaude()` → `.claude/instructions.md` (comprehensive)
- `claudemdCursor()` → `.cursor/rules/900-claude-instructions.mdc`
- `claudemdGeneric()` → `.ai-context/ai-instructions.md`
- `claudemdGithubCopilot()` → (empty, not applicable)
- `claudemdGemini()` → (empty, not applicable)

**Purpose:** Generate custom behavioral rules and guidelines for AI assistants.
**Target-Specific:** Only generated for tools that benefit from detailed AI guidelines.

## Sequential Execution

**Command:**
```bash
node dist/cli.js prompt --target cursor --stage all
node dist/cli.js prompt --target all --stage all
```

**Order:**
1. Scanner → repo-context.yaml (foundation)
2. Context Generator → target-specific context file
3. Architecture → target-specific architecture docs
4. Standards → target-specific standards
5. Tests → target-specific test conventions
6. Drift Check → drift-check.json
7. Claude Markdown → target-specific AI guidelines (if applicable)

**Benefits:**
- Each stage depends on prior context (scanner output)
- Later stages enhance earlier artifacts
- Pipeline can be interrupted and resumed
- Individual stages can be re-run without affecting others
- Each target gets artifacts in its preferred format

## Output Directory Structure by Target

### Cursor IDE
```
.cursor/rules/
├── 000-project-context.mdc
├── 100-typescript-standards.mdc
├── 200-architecture.mdc
├── 300-test-conventions.mdc
└── 900-claude-instructions.mdc
```

### GitHub Copilot
```
.github/
├── copilot-instructions.md
├── architecture.md
├── standards.md
└── test-conventions.md
```

### Claude
```
CLAUDE.md
ARCHITECTURE.md
STANDARDS.md
TEST-CONVENTIONS.md
.claude/
└── instructions.md
```

### Gemini
```
gemini-context.json
gemini-architecture.json
gemini-standards.json
gemini-tests.json
```

### Generic
```
.ai-context/
├── repo-context.json
├── context-generator.md
├── architecture.md
├── standards.md
├── test-conventions.md
├── ai-instructions.md
├── drift-check.json
└── README.md
```

### Common
```
meta/factory/
└── repo-context.yaml
```

## Extending the Pipeline

To add a new stage:

1. Create target-specific functions in `stages.ts`:
   ```typescript
   function myFeatureCursor(context: RepoContext): RenderedFile[] { ... }
   function myFeatureGithubCopilot(context: RepoContext): RenderedFile[] { ... }
   function myFeatureClaude(context: RepoContext): RenderedFile[] { ... }
   function myFeatureGemini(context: RepoContext): RenderedFile[] { ... }
   function myFeatureGeneric(context: RepoContext): RenderedFile[] { ... }
   ```

2. Create orchestrator function:
   ```typescript
   export function stageMyFeature(context: RepoContext, target: Exclude<Target, 'all'>): RenderedFile[] {
     switch (target) {
       case 'cursor': return myFeatureCursor(context);
       case 'github-copilot': return myFeatureGithubCopilot(context);
       // ...
     }
   }
   ```

3. Add the stage type to `types.ts`:
   ```typescript
   export type PromptStage = '...' | 'my-feature' | 'all';
   ```

4. Register in `stagePipeline()` map:
   ```typescript
   const stageMap: Record<Exclude<PromptStage, 'all'>, ...> = {
     // ...
     'my-feature': (ctx, tgt) => stageMyFeature(ctx, tgt),
   };
   ```

5. Add to default pipeline execution list.

## CLI Integration

**Support `--target` flag for `prompt` command:**
```bash
# Specific target
node dist/cli.js prompt --target cursor --stage all

# All targets
node dist/cli.js prompt --target all --stage all
```

**Output includes target in logging:**
```
🎯 Target: cursor
  📋 Stage: scanner
     ✅ WRITE meta/factory/repo-context.yaml
  📋 Stage: context-generator
     ✅ WRITE .cursor/rules/000-project-context.mdc
  ...
```

## CI/CD Integration

**GitHub Actions Example:**
```yaml
name: Generate AI Context
on:
  push:
    paths:
      - 'package.json'
      - 'src/**'
jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install && npm run build
      - run: node dist/cli.js prompt --target all --stage all
      - run: node dist/cli.js drift-check
      - uses: EndBug/add-and-commit@v9
        with:
          message: 'chore: refresh AI context artifacts'
          add: 'meta/factory/ .cursor/ .github/ .claude/ .ai-context/ gemini-*.json *.md'
```
