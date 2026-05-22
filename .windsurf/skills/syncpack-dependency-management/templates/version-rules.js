module.exports = {
  versionGroups: [
    {
      label: 'catalog-deps',
      dependencies: [
        'react',
        'react-dom',
        'next',
        'typescript',
        '@types/react',
        '@types/node',
      ],
      dependencyTypes: ['prod', 'dev'],
    },
  ],
}
