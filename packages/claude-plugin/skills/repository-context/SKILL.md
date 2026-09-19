---
name: repository-context
description: Refresh repository-aware context and detect context drift.
---

Use the `ai-meta-factory` CLI from the repository root. Run `ai-meta-factory generate --target claude --force` when repository structure changes. Run `ai-meta-factory drift-check` before proposing architecture-sensitive changes. Never invent facts that are absent from generated context.
