import * as React from 'react';

import { StartingLocationPicker, LocationPicker } from './components';
import { Trash } from 'src/components/Icons';

const InputFormContainer = () => (
  <div className="app-control__input-form">
    <StartingLocationPicker />
    <hr />
    <LocationPicker
      sectionTitle="Dropoff Locations"
      items={[]}
    />
  </div>
);

export default InputFormContainer;
