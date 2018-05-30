import * as React from 'react';

interface HeaderBarProps {
  title: string;
}

const HeaderBar = ({ title }: HeaderBarProps) => (
  <nav className="app-control__header-bar">
    <span className="app-control__header-bar-title">{title}</span>
  </nav>
);

export default HeaderBar;
