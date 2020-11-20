import { mount } from '@vue/test-utils';
import xDivision from '.';

describe('xDivision', () => {
  test('should render correct contents', async () => {
    // 现在挂载组件，你便得到了这个包裹器
    const wrapper = mount(xDivision, {
      props: {
        data: {
          height: 30,
          min: 10,
          max: 50
        }
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
  });
});