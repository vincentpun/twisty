import * as React from 'react';

interface HeaderBarProps {
  title: string;
}

const HeaderBar = ({ title }: HeaderBarProps) => (
  <nav className="navbar navbar-dark bg-primary">
    <span className="navbar-brand">{title}</span>
  </nav>
);

export default HeaderBar;
