import React from 'react';
import Cards from '../../containers/Cards';
import Appbar from '../../containers/Appbar';
import './styles.scss';

const Home = () => {
  return (
    <section className='Home'>
      <Appbar />
      <Cards />
    </section>
  );
};

export default Home;
