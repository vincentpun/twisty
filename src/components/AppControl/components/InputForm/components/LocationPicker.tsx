import * as React from 'react';
import * as classNames from 'classnames';

import LocationPickerListItem from './LocationPickerListItem';

interface LocationPickerProps {
  sectionTitle: string;
  titleAccessoryRender?: () => JSX.Element;
  items?: LocationPickerListItem[];
  onItemClick?: (item: LocationPickerListItem) => void;
}

export interface LocationPickerListItem {
  title: string;
  key: number | string;
  active?: boolean;
  rightAccessoryRender?: (item: LocationPickerListItem) => JSX.Element;
}

const LocationPicker = ({
  sectionTitle,
  titleAccessoryRender,
  items,
  onItemClick,
}: LocationPickerProps) => (
  <div className="location-picker">
    <div className="location-picker__label">
      <span className="location-picker__label-text">
        {sectionTitle}
      </span>
      {
        !!titleAccessoryRender ?
        <span className="location-picker__label-accessory">
          {titleAccessoryRender()}
        </span> :
        null
      }
    </div>
    {
      !!items && items.length > 0 ?
      <ul className="location-picker__list">
        {
          items.map((item) => (
            <LocationPickerListItem
              title={item.title}
              active={item.active}
              key={item.key}
              onItemClick={!!onItemClick ? () => onItemClick(item) : null}
              rightAccessoryRender={!!item.rightAccessoryRender ? () => item.rightAccessoryRender(item) : null}
            />
          ))
        }
      </ul> :
      null
    }
  </div>
);

export default LocationPicker;
