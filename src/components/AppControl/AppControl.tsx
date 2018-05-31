import * as React from 'react';
import * as classNames from 'classnames';

import HeaderBar from './components/HeaderBar';
import InputFormContainer from './components/InputForm';

interface AppControlProps {
  children?: JSX.Element;
  productName: string;
  className?: string;
}

const AppControl = ({ children, productName, className }: AppControlProps) => (
  <div className={classNames('app-control', className)}>
    <HeaderBar title={productName} />
    <InputFormContainer />
  </div>
)

export default AppControl;
