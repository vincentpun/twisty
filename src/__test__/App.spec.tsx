import { shallow } from 'enzyme';
import * as React from 'react';

import App from '../App';

describe('App', () => {
  it('renders properly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('div').first().text()).toBe('Hello World!')
  });
});
