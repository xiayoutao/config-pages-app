const modulesFiles = require.context('../components', true, /\.jsx$/);
const modules = modulesFiles
  .keys()
  .reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
  }, {});

let components = {};
Object.keys(modules).forEach(item => {
  const cps = modules[item];
  components[cps.name] = cps;
});

// import XTitle from './x-title/index.jsx';
// import XSearch from './x-search/index.jsx';
// components['x-title'] = XTitle;
// components['x-search'] = XSearch;

export default components;