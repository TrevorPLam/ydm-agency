# Biome Migration Checklist

## Pre-Migration
- [ ] Document current ESLint rules
- [ ] Document current Prettier configuration
- [ ] Check for custom ESLint plugins
- [ ] Verify TypeScript configuration

## Migration Steps
- [ ] Install Biome: `pnpm add -D biome -w`
- [ ] Create biome.json configuration
- [ ] Configure ESLint flat config for hybrid setup
- [ ] Add lint and format scripts
- [ ] Run Biome check on codebase
- [ ] Fix auto-fixable issues
- [ ] Review remaining issues manually
- [ ] Update .gitignore for Biome cache

## Post-Migration
- [ ] Update CI/CD workflows
- [ ] Update pre-commit hooks
- [ ] Update documentation
- [ ] Remove Prettier if no longer needed
- [ ] Remove ESLint plugins now handled by Biome
