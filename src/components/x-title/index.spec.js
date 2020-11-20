import { shallowMount } from '@vue/test-utils';
import xTitle from '.';

describe('x-title 组件', () => {
  test('should render correct contents', () => {
    // 现在挂载组件，你便得到了这个包裹器
    const wrapper = shallowMount(xTitle, {
      props: {
        data: {
          title: '标题内容',
          desc: '',
          linkType: 0,
        }
      }
    });
      
    expect(wrapper.find('.label').text()).toBe('标题内容');
  });
});