import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Layout.css';

const Layout = () => {
    return (
        <>
        <Navbar />
        <div className="layout-container">
          <div className="content">
            <Outlet />
          </div>
        </div>
        <Footer />
      </>
      
    );
};

export default Layout;
