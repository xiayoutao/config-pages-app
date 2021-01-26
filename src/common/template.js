export const importPage = view => () => import (`@/views/${view}.vue`);

/**
 * 遍历目录（弃用）
 * @param {*} require
 * @param {String} Catalog 目录
 * @param {Boolean} isPass 是否可以直接访问，true不需要校验权限，false需要校验权限
 */
export function autoImportVue(files, Catalog, isPass) {
  return files
    .keys()
    .map(item => {
      const routeName = item.replace(/^\.\/(.*)\.\w+$/, '$1');
      const route = files(item).default;
      const routePath = routeName.indexOf('/index') >= 0
        ? '/' + routeName.replace('/index', '')
        : '/' + routeName;
      return {
        path: routePath,
        name: route.name || routeName,
        component: importPage(Catalog + routeName),
        meta: {
          title: route.title,
          isPass: !!isPass
        }
      }
    });
}
