module.exports = {
  presets: [
    '@babel/preset-flow',
    ['@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  env: {
    test: {
      presets: [['@babel/preset-env']],
    },
  },
};
