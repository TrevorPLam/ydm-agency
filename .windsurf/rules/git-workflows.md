---
trigger: glob
globs: .git/**
---

<git_workflows>
- Use Conventional Commits format: <type>[optional scope]: <description>
- Common types: feat, fix, docs, style, refactor, perf, test, chore, ci
- Keep subject line under 50 characters (50/72 rule)
- Wrap body at 72 characters
- Body explains why, not what (diff shows what changed)
- Link related issues in commit body (e.g., Fixes #342)
- Use breaking change indicator: ! after type/scope or BREAKING CHANGE footer
- Keep PRs small and focused on single concern
- Use PR templates for consistency
- Link PRs to issues for traceability
- Use draft PRs for work-in-progress
- Rebase feature branches before merging to keep history clean
- Use git hooks for automation (pre-commit, commit-msg, pre-push)
- Configure commit-msg hook to enforce Conventional Commits
- Configure pre-commit hook to run linting and formatting
- Configure pre-push hook to run tests
- Handle merge conflicts carefully, communicate with team
</git_workflows>
