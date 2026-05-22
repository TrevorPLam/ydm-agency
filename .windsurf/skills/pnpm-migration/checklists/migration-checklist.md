# pnpm Migration Checklist

## Pre-Migration
- [ ] Backup current node_modules and package-lock.json files
- [ ] Document current npm scripts
- [ ] Check for any npm-specific configurations
- [ ] Verify Node.js version is 18+

## Migration Steps
- [ ] Install pnpm globally: `npm install -g pnpm@11`
- [ ] Remove all node_modules directories
- [ ] Remove all package-lock.json files
- [ ] Create pnpm-workspace.yaml
- [ ] Configure catalog in pnpm-workspace.yaml
- [ ] Run `pnpm install`
- [ ] Verify all dependencies installed correctly
- [ ] Test build: `pnpm build`
- [ ] Test tests: `pnpm test`

## Post-Migration
- [ ] Update CI/CD workflows to use pnpm
- [ ] Update documentation with pnpm commands
- [ ] Update team onboarding guides
- [ ] Remove npm from global if no longer needed
- [ ] Commit pnpm-lock.yaml to repository
