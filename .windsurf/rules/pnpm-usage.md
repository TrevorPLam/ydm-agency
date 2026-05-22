---
trigger: always_on
---

<package_management>
- Always use pnpm commands, never npm
- Use workspace protocol for local dependencies: `workspace:*` or `workspace:^1.0.0` for versioned workspace deps
- Use catalogs for shared dependency versions in pnpm-workspace.yaml (reduces duplication, easier upgrades)
- Reference catalog versions with `catalog:` protocol (e.g., `"react": "catalog:"`)
- Use named catalogs for migration scenarios: `catalog:name` (e.g., `catalog:react17`)
- Catalogs can be used in dependencies, devDependencies, peerDependencies, optionalDependencies, and overrides
- Never commit pnpm-lock.yaml to gitignore
- Run `pnpm install` after modifying package.json
- Use `pnpm -F <package>` to run commands in specific packages
- Use `pnpm --filter <package>` for workspace filtering
- Configure linkWorkspacePackages in pnpm-workspace.yaml for workspace linking behavior
- Use catalogMode to enforce catalog usage across workspace
</package_management>
