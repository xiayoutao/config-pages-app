const requireComponents = require.context('@/components', true, /\.vue$/);
let components = [];
requireComponents.keys().forEach(item => {
  const data = requireComponents(item).default;
  components[data.name] = data;
});

export default [{
  name: components.test,
  configs: {
    ref: 'test00',
    props: {
      data: '腾讯'
    }
  },
  children: [{
    name: components.test,
    configs: {
      ref: 'test1',
      props: {
        data: '百度'
      }
    },
    children: [{
      name: components.test,
      configs: {
        ref: 'test3',
        props: {
          data: '谷歌1'
        }
      }
    }, {
      name: components.test,
      configs: {
        ref: 'test4',
        props: {
          data: '阿里'
        }
      },
      children: [{
        name: components.test,
        configs: {
          ref: 'test5',
          props: {
            data: '谷歌2'
          }
        },
        children: [{
          name: components.test,
          configs: {
            ref: 'test6',
            props: {
              data: '谷歌3'
            }
          }
        }]
      }]
    }]
  }, {
    name: components.test,
    configs: {
      ref: 'test',
      props: {
        data: '抖音'
      }
    }
  }, {
    name: components.test,
    configs: {
      ref: 'test0',
      props: {
        data: '京东'
      }
    }
  }]
}];
