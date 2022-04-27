import React from 'react';
import { Header } from '../components/shared/Header';

export const Layout = ({ className, children }) => {
  return (
    <>
      <Header />
      <div className={`main ${className || ''}`}>{children}</div>
    </>
  );
};
