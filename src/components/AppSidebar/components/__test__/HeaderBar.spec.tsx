import * as React from 'react';
import { shallow } from 'enzyme';

import HeaderBar from '../HeaderBar';

describe('HeaderBar', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<HeaderBar title="" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the title', () => {
    const wrapper = shallow(<HeaderBar title="Hero" />);
    expect(wrapper.find('.navbar-brand').text()).toEqual('Hero');
  });
});
