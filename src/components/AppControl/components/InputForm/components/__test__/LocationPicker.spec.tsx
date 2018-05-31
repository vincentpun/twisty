import * as React from 'react';
import { shallow } from 'enzyme';

import LocationPicker from '../LocationPicker';
import LocationPickerListItem from '../LocationPickerListItem';

describe('LocationPicker', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(
      <LocationPicker
        sectionTitle="Section title"
        items={[{ key: 'a', title: 'Test' }]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the list with items', () => {
    const items = [
      {
        title: 'Test',
        key: 'a',
      },
      {
        title: 'Test 2',
        key: 'b',
      }
    ];

    const wrapper = shallow(<LocationPicker sectionTitle="" items={items} />);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find(LocationPickerListItem).length).toBe(2);
  });

  it('does not render the list with no items', () => {
    const items: {title: string, key: string}[] = [];

    let wrapper = shallow(<LocationPicker sectionTitle="" items={items} />);
    expect(wrapper.find('ul').length).toBe(0);

    wrapper = shallow(<LocationPicker sectionTitle="" />);
    expect(wrapper.find('ul').length).toBe(0);
  });

  it('does not have accessroy element with no title accessory renderer', () => {
    const wrapper = shallow(<LocationPicker sectionTitle="" />);
    expect(wrapper.find('.location-picker__label-accessory').length).toBe(0);
  });

  it('calls and renders the title accessory renderer', () => {
    const spy = jest.fn();
    spy.mockReturnValue(<div className="accessory-render">Test</div>);

    const wrapper = shallow(<LocationPicker sectionTitle="" titleAccessoryRender={spy} />);

    expect(spy).toHaveBeenCalled();
    expect(wrapper.find('.accessory-render').length).toBe(1);
    expect(wrapper.find('.accessory-render').text()).toBe('Test');
  });
});
