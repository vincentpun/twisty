import * as React from 'react';
import * as classNames from 'classnames';

interface LocationListItemProps {
  title: string;
  active?: boolean;
  onItemClick?: () => void;
  rightAccessoryRender?: () => JSX.Element;
}

const LocationPickerListItem = ({ title, active, onItemClick, rightAccessoryRender }: LocationListItemProps) => (
  <li
    className={classNames(
      'location-picker__list-item',
      {
        'location-picker__list-item--selected': active,
        'location-picker__list-item--with-right-accessory': !!rightAccessoryRender,
      },
    )}
  >
    <div
      onClick={!!onItemClick ? () => onItemClick() : null}
      className="location-picker__list-item-text"
    >
      {title}
    </div>
    {
      !!rightAccessoryRender ?
      <span className="location-picker__list-item-right-accessory">
        <span className="location-picker__list-item-icon">
          {rightAccessoryRender()}
        </span>
      </span> :
      null
    }
  </li>
);

export default LocationPickerListItem;
