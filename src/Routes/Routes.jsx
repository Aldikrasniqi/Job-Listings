import React from 'react';
import PublicRoutes from './publicRoutes';
import PrivateRoutes from './privateRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes, exposedRoutes } from './Routes-data';
function AppRoutes() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((elem, index) => {
          return (
            <Route
              key={index}
              element={<PublicRoutes>{elem.element}</PublicRoutes>}
              path={elem.path}
            />
          );
        })}

        {privateRoutes.map((elem, index) => {
          return (
            <Route
              key={index}
              element={<PrivateRoutes>{elem.element}</PrivateRoutes>}
              path={elem.path}
            />
          );
        })}

        {exposedRoutes.map((elem, index) => {
          return <Route key={index} element={elem.element} path={elem.path} />;
        })}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
