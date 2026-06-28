---
name: Spec-Driven Project Guide
version: 1.0
created: 2026-06-28
project: AITutorial/Spec-Driven
role: Technical Expert
skill: Technical Writer
vault: /home/cqshinn/claude/
---

# Project Configuration

## Project Context

- **Name:** Spec-Driven
- **Parent:** AITutorial
- **Focus:** Specification-driven development methodology, blog series guides, LLM systems
- **Vault:** `/home/cqshinn/claude/` (shared across all projects)

## Inheritance

This project inherits global rules from `~/.claude/CLAUDE.md` + overrides specific to Spec-Driven work:

- **Task workflow:** TDD-first (red-green-refactor mandatory)
- **Git:** Atomic commits with structured messages
- **Verification:** Browser automation for UI changes, tests before completion
- **Context management:** context-mode MCP tools for large outputs

## Spec-Driven Workflow

### Phase 1: Plan
- Read existing PLAN.md or create one via `/spec`
- Document: goal, assumptions, acceptance criteria
- Link: related vault notes, prior decisions

### Phase 2: Implement (TDD)
1. Write failing test (RED)
2. Implement minimal code (GREEN)
3. Refactor + verify (REFACTOR)
4. All tests pass before moving on

### Phase 3: Verify
- Run full test suite (0 failures required)
- Browser verification for UI changes
- Code review via `/code-review`
- Link: dev logs to vault

### Phase 4: Document
- Update guide drafts in vault `/Blog/drafts/`
- Add tested code examples
- Link: related concepts, decisions

## Permissions & Tools

### Allowed (no prompt)
- Git reads: `git status`, `git log`, `git diff`
- File navigation: `ls`, `find`, `grep`
- Tests: `npm test`, `pytest`, `bun test`
- Building: `npm run build`, `cargo build`
- Context-mode: all `ctx_*` commands

### Require confirmation
- Git writes: `git add`, `commit`, `push`, `branch`
- Destructive ops: `rm -rf`, `git reset --hard`, `checkout --`
- File mutations outside project: direct to `~/.claude/`, `/etc/`, etc.

### Task Management

- Create task on every user request (TaskCreate)
- Update status: pending → in_progress → completed
- Link to vault project note when work touches vault
- Append to session log

## Tool Selection

**Primary (prefer these):**
- CodeGraph for codebase orientation + call graphs
- Probe CLI for semantic code search
- ctx_* for large outputs (logs, test results, analysis)
- Browser automation (Chrome → DevTools MCP → playwright-cli → agent-browser priority)

**Secondary (when needed):**
- Grep/Glob for exact text/pattern matches (last resort)
- Bash for git/file ops only

## Vault Integration

Vault path: `/home/cqshinn/claude/`

**Auto-operations:**
- `/obsidian-save` after work sessions (log insights, tested patterns, decisions)
- Link: `Blog/drafts/` for in-progress guides related to this project
- Project note: `Projects/Spec-Driven.md` tracks milestones, decisions, active drafts

**What to save to vault:**
- Technical decisions (linked from project PLAN.md)
- Code patterns discovered (tested examples in Dev Logs)
- Audience feedback on guides (Ideas/ folder)
- Challenges to assumptions (Decisions/)
- Contradictions resolved (Reconciliation notes)

## Testing Strategy

### Unit Tests
- New functions: red-green-refactor TDD cycle
- Mocking: all external deps (DB, HTTP, subprocess)
- Naming: `test_<function>_<scenario>_<expected>` (Python) | `it("should...")` (TS)
- Coverage: ≥80% via `--cov` flag

### Integration Tests
- Real dependencies (test DB, test API, real files)
- Marked with `@pytest.mark.integration`
- Run separately: `pytest -m integration`

### E2E Tests
- Frontend changes: browser automation (Chrome/DevTools/playwright/agent-browser)
- API chains: full workflow verification
- Marked location: `tests/e2e/`

### Execution
```bash
# Unit tests
pytest -q --cov=src --cov-fail-under=80

# Integration tests
pytest -m integration -v

# All
pytest -v
```

## Git Workflow

- **Branch:** feature/name or bugfix/name
- **Commits:** Atomic. Message: `type(scope): description` (Conventional Commits)
  - `feat(guide): add code examples for async patterns`
  - `fix(tests): mock subprocess calls in test_auth`
  - `docs(vault): link related guides`
- **Push:** After review + all tests pass
- **Never:** `--force`, `--no-verify`, `-f` without explicit user permission

## Before Task Completion

- [ ] All tests pass (0 failures)
- [ ] Code changes have supporting tests
- [ ] Browser verified (if UI changed)
- [ ] Vault linked (if decision/pattern/learning)
- [ ] Commit message clear + atomic
- [ ] No leftover debug code

## Key Files

- `PLAN.md` — Phase tracking, acceptance criteria
- `REVIEW.md` — Code review findings (from `/code-review`)
- `.claude/settings.json` — Project-specific permissions + env vars
- `.claude/CLAUDE.md` — This file

## Session Start Checklist

1. Read this file (you are here)
2. Check vault: `/obsidian-world` to load identity + current state
3. List tasks: `TaskList` (continue uncompleted work first)
4. Read PLAN.md if exists (phase status, next step)
5. Start work: create task, update to in_progress

## Notes

Spec-driven means: write the spec before the code. Tests are specs. Vault guides the writing. Every decision gets logged. Every guide example gets tested. Quality is audit-able through vault + git history.
