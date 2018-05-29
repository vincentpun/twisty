import * as React from 'react';
import { shallow } from 'enzyme';

import AppSidebar from '../AppSidebar';

describe('AppSidebar', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<AppSidebar productName="" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders children', () => {
    const wrapper = shallow(
      <AppSidebar productName="">
        <div className="test">Test</div>
      </AppSidebar>
    );

    expect(wrapper.find('.test').length).toBe(1);
    expect(wrapper.find('.test').first().text()).toBe('Test');
  });
});
