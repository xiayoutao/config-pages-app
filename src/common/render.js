/* eslint-disable */
export default function render(h, pageConfig) {
  if (pageConfig instanceof Array) {
    let children = [];
    pageConfig.forEach(item => {
      children.push(render(h, item));
    });
    return children;
  } else if (pageConfig instanceof Object) {
    const hasChild = pageConfig.children && pageConfig.children.length > 0;
    return h(pageConfig.name, {
      ...pageConfig.configs
    }, hasChild
      ? render(h, pageConfig.children)
      : pageConfig.label || '');
  }
}