module.exports = {
  versionGroups: [
    {
      label: 'catalog',
      dependencies: ['react', 'next', 'typescript'],
      dependencyTypes: ['prod', 'dev'],
    },
  ],
  types: ['prod', 'dev', 'peer'],
}
