import * as React from 'react';
import { shallow } from 'enzyme';

import AppControl from '../AppControl';

describe('AppControl', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<AppControl productName="" />);
    expect(wrapper).toMatchSnapshot();
  });
});
