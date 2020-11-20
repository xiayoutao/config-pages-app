module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: [
    '**/*.spec.js'
  ]
}
