import React from 'react';
import Cards from '../../containers/Cards';
import Appbar from '../../containers/Appbar';
import Head from '../../components/Head';
import './styles.scss';

const Home = () => {
  return (
    <>
      <Head />
      <section className='Home'>
        <Appbar />
        <Cards />
      </section>
    </>
  );
};

export default Home;
