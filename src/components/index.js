const modulesFiles = require.context('../components', true, /\.vue$/);
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

export default components;