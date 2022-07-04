import React, { useState } from 'react';
import { TiTimes } from 'react-icons/ti';
import { CgMenuMotion } from 'react-icons/cg';
import Filters from '../Filters';
import { useStateValue } from '../../context';
import Searcher from '../../components/Searcher';
import './styles.scss';

const Appbar = () => {
  const { cards } = useStateValue();
  const [openFilters, setOpenFilters] = useState(false);

  const searchCard = ({ cardName }: { cardName: string }) => {
    const cardsFind = cards?.filter((item) => item.Name.toLowerCase().includes(cardName.toLowerCase()));
    console.log(cardsFind);
  };

  // const handleFilters = (data: any) => {
  //   const actives = Object?.values(data)?.filter((item) => item);
  //   console.log(actives);
  // };

  return (
    <section className='Appbar'>
      <div className='Appbar__handler'>
        <button
          type='button'
          title='Open menu'
          onClick={() => setOpenFilters(true)}
          className='Appbar__handler--button btn-primary'
        >
          <CgMenuMotion />
        </button>
      </div>
      {openFilters && (
        <div className='Appbar__handler--open'>
          <button
            type='button'
            title='Close menu'
            onClick={() => setOpenFilters(false)}
            className='Appbar__handler--button btn-link-white'
          >
            <TiTimes />
          </button>
        </div>
      )}
      <Searcher onSubmit={searchCard} />
      <Filters
        showFilters={openFilters}
        onClose={() => setOpenFilters(false)}
      />
    </section>
  );
};

export default Appbar;
