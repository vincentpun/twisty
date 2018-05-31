import * as React from 'react';

import LocationPicker from './components/LocationPicker';
import { Trash } from 'src/components/Icons';

const InputFormContainer = () => (
  <div className="app-control__input-form">
    <LocationPicker
      sectionTitle="Starting Location"
      items={[]}
    />
    <hr />
    <LocationPicker
      sectionTitle="Dropoff Locations"
      items={[]}
    />
  </div>
);

export default InputFormContainer;
