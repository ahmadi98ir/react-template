 import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Preloader from './Preloader';

const NoxfolioLayout = ({ children, header = 1, footer = 1, onePageMenu }) => {
  return (
    <>
      <Preloader />
      <Header type={header} onePageMenu={onePageMenu} />
      <main>{children}</main>
      <Footer type={footer} />
    </>
  );
};

export default NoxfolioLayout;