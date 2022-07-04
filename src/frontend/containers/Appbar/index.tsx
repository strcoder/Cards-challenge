import React, { useState } from 'react';
import { TiTimes } from 'react-icons/ti';
import { CgMenuMotion } from 'react-icons/cg';
import Filters from '../Filters';
import { useStateValue } from '../../context';
import Searcher from '../../components/Searcher';
import { searchCards } from '../../context/actions';
import './styles.scss';

const Appbar = () => {
  const { cards, dispatch } = useStateValue();
  const [cleanSearch, setCleanSearch] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  const searchCard = ({ cardName }: { cardName: string }) => {
    searchCards({ cards, cardName, dispatch });
  };

  const handleCloseFilter = () => {
    setOpenFilters(false);
    setCleanSearch(true);
    setTimeout(() => {
      setCleanSearch(false);
    }, 0);
  };

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
      <Searcher
        clean={cleanSearch}
        onSubmit={searchCard}
      />
      <Filters
        showFilters={openFilters}
        onClose={handleCloseFilter}
      />
    </section>
  );
};

export default Appbar;
