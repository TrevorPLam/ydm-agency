# Changeset Workflow Guide

## Creating a Changeset
1. Run `pnpm changeset`
2. Select packages to version
3. Choose version bump type (major, minor, patch)
4. Add summary of changes
5. Commit the changeset file

## Versioning Packages
1. Run `pnpm version-packages`
2. Review version bumps
3. Commit package.json changes
4. Push to main branch

## Publishing
1. Run `pnpm release`
2. Packages are published to npm
3. Changelog is generated
