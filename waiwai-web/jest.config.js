module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // ↓↓↓ これを追加する！
    globals: {
      'ts-jest': {
        useBabelrc: true,
        tsConfigFile: './tsconfig.jest.json',
      },
    },
  };
  