import * as React from 'react';
import * as classNames from 'classnames';

interface HeaderBarProps {
  title: string;
  className?: string;
}

const HeaderBar = ({ title, className }: HeaderBarProps) => (
  <nav className={classNames('header-bar', className)}>
    <span className="header-bar__title">{title}</span>
  </nav>
);

export default HeaderBar;
