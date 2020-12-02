module.exports = {
  globals: {
    'process': true,
    'module': true
  },
  env: {
    'browser': true,
    'node': true
  },
  parserOptions: {
    'parser': 'babel-eslint'
  },
  plugins: [
    'html', 'vue'
  ],
  extends: [
    'plugin:vue/essential', 'eslint:recommended'
  ],
  rules: {
    'standard/no-callback-literal': 0,
    // allow async-await
    'generator-star-spacing': 0, // 生成器函数*的前后空格
    'no-debugger': process.env.NODE_ENV === 'production'
      ? 2
      : 0, // 禁止使用debugger
    'semi': 0,
    'comma-dangle': 0,
    'quotes': [
      1, 'single'
    ],
    'spaced-comment': 2, // 注释风格不要有空格什么的
    'no-multi-spaces': 2, // 不能用多余的空格
    'no-unused-vars': 0, // 不能有声明后未被使用的变量或参数
    'one-var': 0, // 连续声明
    'no-multiple-empty-lines': 2, // 空行最多不能超过2行
    'eol-last': 0, // 文件以单一的换行符结束
    'no-sequences': 0, // 禁止使用逗号运算符
    'no-unused-expressions': 0, // 禁止无用的表达式
    'space-before-function-paren': [
      1, 'always'
    ], // 函数定义时括号前面要不要有空格
    'space-infix-ops': 2, // 中缀操作符周围要不要有空格，如等号
    'keyword-spacing': 2, // 关键字后面空格
    'no-unneeded-ternary': 0, // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    'camelcase': 1, // 强制驼峰法命名
    'no-trailing-spaces': 1, // 一行结束后面不要有空格
    'no-undef': 1, // 不能有未定义的变量
    'new-cap': 0, // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    'no-new': 0,
    'no-console': 0,
    'no-empty': 0,
    'no-extra-semi': 0,
    'no-useless-escape': 0
  }
};
