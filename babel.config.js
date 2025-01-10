module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          hooks: './src/hooks',
          components: './src/components',
          constants: './src/constants',
          api: './src/api',
          pages: './src/pages',
          utils: './src/utils',
        },
      },
    ],
  ],
};
