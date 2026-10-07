# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — 2026-09-19

### Added

- Initial release of ai-meta-factory
- Deterministic repository scanner
- Multi-target context generation:
  - Cursor (`.cursor/rules/` markdown)
  - GitHub Copilot (`.github/` markdown)
  - Claude (comprehensive markdown with rationale)
  - Gemini (API-ready JSON)
  - Generic/tool-neutral (JSON format)
- CLI with full command set:
  - `ai-meta-factory init` — Generate context
  - `ai-meta-factory drift-check` — Validate context freshness
  - `ai-meta-factory --help` — Show help
  - `ai-meta-factory --version` — Show version
- CLI flags:
  - `--target <target>` — Specify generation targets
  - `--path <path>` — Specify repository path
  - `--dry-run` — Preview without writing files
  - `--force` — Overwrite existing files
- GitHub Actions workflow template for drift detection
- Claude Code plugin skeleton
- Comprehensive documentation and examples
- Non-commercial license with commercial licensing option

### Documentation

- README with quick start and detailed usage
- NPM package polish checklist
- 5-minute demo script
- Launch announcements for multiple platforms
- Changelog (this file)

---

## Unreleased

### Planned

- AST-based language-specific conventions detection
- VS Code extension for Cursor integration
- Hosted dashboard for multi-repository management
- Commercial licensing portal
- Integration with additional AI tools (Continue, Cline, Roo Code)
- Marketplace submissions (Cursor plugin, VS Code extension, Claude plugin)
- Test suite and CI/CD pipeline
- Performance optimizations for large repositories
