import * as React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('App', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
