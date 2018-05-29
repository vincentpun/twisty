import * as React from 'react';

import HeaderBar from './components/HeaderBar';

interface AppSidebarProps {
  children?: JSX.Element;
  productName: string;
}

const AppSidebar = ({ children, productName }: AppSidebarProps) => (
  <div className="app-sidebar">
    <HeaderBar title={productName} />
    {children}
  </div>
)

export default AppSidebar;
