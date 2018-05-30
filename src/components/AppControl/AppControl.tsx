import * as React from 'react';

import HeaderBar from './components/HeaderBar';
import InputFormContainer from './components/InputForm';

interface AppControlProps {
  children?: JSX.Element;
  productName: string;
}

const AppControl = ({ children, productName }: AppControlProps) => (
  <div className="app-control">
    <HeaderBar title={productName} />
    <InputFormContainer />
  </div>
)

export default AppControl;
