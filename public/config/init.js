/**
 * 动态加载初始资源
 */;
(function () {
  var resList = {
    // icon: window.SITE_CONFIG.cdnUrl + '/favicon.ico',
    css: ['//at.alicdn.com/t/font_1447591_45k75lay96x.css'],
    js: [
      // 插件, 放置业务之前加载, 以免业务需求依赖插件时, 还未加载出错
    ]
  };

  // 图标
  (function () {
    if (resList.icon) {
      var _icon = document.createElement('link');
      _icon.setAttribute('rel', 'shortcut icon');
      _icon.setAttribute('type', 'image/x-icon');
      _icon.setAttribute('href', resList.icon);
      document
        .getElementsByTagName('head')[0]
        .appendChild(_icon);
    }
  })();

  // 样式
  (function () {
    document.getElementsByTagName('html')[0].style.opacity = 0;
    var i = 0;
    var _style = null;
    var createStyles = function () {
      if (i >= resList.css.length) {
        document.getElementsByTagName('html')[0].style.opacity = 1;
        return;
      }
      _style = document.createElement('link');
      _style.href = resList.css[i];
      _style.setAttribute('rel', 'stylesheet');
      _style.onload = function () {
        i++;
        createStyles();
      };
      document
        .getElementsByTagName('head')[0]
        .appendChild(_style);
    };
    createStyles();
  })();

  // 脚本
  document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
      var i = 0;
      var _script = null;
      var createScripts = function () {
        if (i >= resList.js.length) {
          return;
        }
        _script = document.createElement('script');
        _script.src = resList.js[i];
        _script.onload = function () {
          i++;
          createScripts();
        };
        console.log(_script);
        document
          .getElementsByTagName('body')[0]
          .appendChild(_script);
      };
      createScripts();
    }
  };
})();