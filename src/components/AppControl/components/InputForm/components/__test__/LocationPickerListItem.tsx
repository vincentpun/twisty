import * as React from 'react';
import { shallow } from 'enzyme';

import LocationPickerListItem from '../LocationPickerListItem';

describe('LocationPickerListItem', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<LocationPickerListItem
      title="test"
      active={false}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onItemClick when text is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<LocationPickerListItem title="" active={false} onItemClick={spy} />);
    wrapper.find('.location-picker__list-item-text').simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('calls onItemClick when text is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<LocationPickerListItem title="" active={false} onItemClick={spy} />);
    wrapper.find('.location-picker__list-item-text').simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('calls and renders accessory renderer', () => {
    const spy = jest.fn();
    spy.mockReturnValue(<div className="item-accessory">Test</div>);

    const wrapper = shallow(<LocationPickerListItem title="" rightAccessoryRender={spy} />);
    expect(wrapper.find('.item-accessory').length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
});
