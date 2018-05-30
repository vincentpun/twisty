import * as React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import { createReduxStore } from '../state/createReduxStore';

const store = createReduxStore();

describe('App', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<App store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
});
