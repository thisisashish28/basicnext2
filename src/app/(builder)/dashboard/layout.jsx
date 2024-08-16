import React from 'react';
import Sidebar from '../_components/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen" style={{ backgroundColor: '#f0f0ff' }}>
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
