# 5-Minute Demo Script

## Setup (30 seconds)

```bash
# Open a terminal
# Clone a sample repo or use current directory
cd ~/my-project

# Show the directory structure
ls -la
echo "^ This is a real TypeScript/Python/Go project"
```

## Part 1: Problem (1 minute)

**Narration:**

"When I ask an AI agent like GitHub Copilot or Claude to help with this codebase, it doesn't know:
- Where the entry points are
- What naming conventions we follow
- How the architecture is organized
- What commands to run
- What constraints we enforce

So it guesses. And it often gets it wrong."

**Show:**

```bash
# Show package.json or pyproject.toml
cat package.json | head -20
echo "^ This tells AI the basics, but nothing about our architecture"

# Show a source file
ls -la src/
echo "^ But the AI has never seen what's actually in here"
```

## Part 2: Solution (2 minutes)

**Narration:**

"Instead of asking AI to guess, let's generate a context document from the actual repository."

**Show:**

```bash
# Install (if not already done)
npm install -g ai-meta-factory
# or
npx ai-meta-factory --version

echo "✓ ai-meta-factory is installed"
```

**Narration:**

"Let's scan this repository and generate context."

```bash
# Preview without writing
ai-meta-factory init --target all --dry-run

echo ""
echo "^ This shows what would be generated."
echo "  No files written yet. Let's actually generate for Cursor."
```

**Show:**

```bash
# Generate for Cursor (our main target)
ai-meta-factory init --target cursor

echo ""
echo "✓ Generated .cursor/rules/000-project-context.mdc"
echo "✓ Generated meta/factory/repo-context.yaml"
```

**Narration:**

"Now let's look at what was generated."

```bash
cat .cursor/rules/000-project-context.mdc

echo ""
echo "^ This is context that Cursor will now use for every conversation."
echo "  It knows the languages, frameworks, entry points, and constraints."
```

**Show:**

```bash
cat meta/factory/repo-context.yaml | head -30

echo ""
echo "^ This is the source of truth. All other formats are generated from this."
```

## Part 3: Multi-Tool Support (1 minute)

**Narration:**

"ai-meta-factory supports multiple AI tools. Same repository, different outputs."

**Show:**

```bash
# Generate for GitHub Copilot
ai-meta-factory init --target github-copilot --force
echo "✓ Generated .github/copilot-instructions.md"

cat .github/copilot-instructions.md | head -20

echo ""

# Generate for Claude
ai-meta-factory init --target claude --force
echo "✓ Generated CLAUDE.md"

cat CLAUDE.md | head -20

echo ""

# Generate for Gemini
ai-meta-factory init --target gemini --force
echo "✓ Generated gemini-context.json"

cat gemini-context.json | head -30
```

**Narration:**

"Every tool gets format-optimized context:
- Cursor: markdown rules in .cursor/rules/
- Copilot: instructions in .github/
- Claude: comprehensive markdown
- Gemini: structured JSON for API

All from a single scan."

## Part 4: Drift Detection (30 seconds)

**Narration:**

"When your repository changes, you might need to regenerate context. ai-meta-factory can detect that."

**Show:**

```bash
ai-meta-factory drift-check

echo "Exit code: $?"
echo ""
echo "OK: context matches repository"
echo ""
echo "Now let's simulate a change..."

# Simulate drift (optional: touch a new file in src/)
mkdir -p src/new-module
touch src/new-module/index.ts

echo "^ Added a new module"
echo ""

ai-meta-factory drift-check
echo "Exit code: $?"
echo ""
echo "DRIFT: Now the context is out of sync."
echo ""
echo "Regenerate:"
ai-meta-factory init --target all --force
echo ""
echo "Context is now current again."
```

## Closing (optional)

**Narration:**

"That's ai-meta-factory in 5 minutes.

- Scan once
- Generate context for your AI tools
- Keep it in sync with drift detection
- No more hallucination

Available on npm. Try it now."

**Show:**

```bash
echo "Learn more:"
echo "  npm: https://www.npmjs.com/package/ai-meta-factory"
echo "  GitHub: https://github.com/devendra-solanki-work/ai-meta-factory"
echo "  Docs: README.md in the repository"
```

---

## Pro Tips for Recording

1. **Font size:** Make terminal text large (18pt+)
2. **Speed:** Run commands slowly, pause to let text settle
3. **Callouts:** Use terminal echo statements to highlight key points
4. **Before/After:** Show one Copilot suggestion without context, then with context (if possible)
5. **Real repo:** Use an actual project, not a fake one
6. **Clean state:** Start with existing generated files removed (or use `--dry-run` first)
7. **Editing:** Fast-forward boring terminal output; keep talking
8. **Length:** Aim for exactly 5 minutes; cut anything under 10 seconds that doesn't add value
