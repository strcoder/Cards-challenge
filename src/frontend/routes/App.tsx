//
import React from 'react';
import {
  Route,
  Routes as Switch,
} from 'react-router-dom';

import Home from '../pages/Home';
import Layout from '../components/Layout';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
      </Switch>
    </Layout>
  );
};

export default Routes;

