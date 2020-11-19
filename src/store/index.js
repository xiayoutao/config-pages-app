import Vue from 'vue';
import Vuex from 'vuex';
import {
  siteName,
  version,
  copyright,
} from '@/constants';

Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles
  .keys()
  .reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
  }, {});

export default new Vuex.Store({
  state: {
    siteName,
    version,
    copyright,
  },
  modules,
  getters: {},
  mutations: {},
  strict: process.env.NODE_ENV !== 'production'
});
