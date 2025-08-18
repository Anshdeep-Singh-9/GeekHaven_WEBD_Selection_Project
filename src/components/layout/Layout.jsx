import React from 'react';
import Header from './Header';

const Layout = ({ children, title, subtitle }) => {
  return (
    <>
      <Header />
      <div className="container">
        {title && <h1 className="title">{title}</h1>}
        {subtitle && <p className="subtitle">{subtitle}</p>}
        {children}
      </div>
    </>
  );
};

export default Layout;
