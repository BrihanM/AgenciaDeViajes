import React from 'react';
import Navegacion from '../Pages/NavVar.jsx';
import Routers from '../Router/Router.jsx';

const Layout = () => {
  return (
    <>
      <Navegacion />
      <div>
        <Routers />
      </div>
    </>
  );
};

export default Layout;