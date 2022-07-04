/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import './styles.scss';

const Searcher = ({ onSubmit, clean }) => {
  const { register, handleSubmit, reset } = useForm();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (clean) {
      reset({ cardName: '' });
    }
  }, [clean]);

  return (
    <div className='Searcher'>
      <form onSubmit={handleSubmit(onSubmit)} className='Searcher__container'>
        <label htmlFor='SearcherName' className='Searcher__container--input'>
          <span className={`Searcher__input--icon ${active}`}>
            <BiSearch />
          </span>
          <input
            type='text'
            defaultValue=''
            id='SearcherName'
            autoComplete='off'
            placeholder='Search...'
            className='Searcher__input--field'
            {...register('cardName', {
              required: true,
              onBlur: () => setActive(false),
              onChange: () => setActive(true),
            })}
          />
        </label>
        <button type='submit' className='Searcher__container--button btn-primary'>
          Search
        </button>
      </form>
    </div>
  );
};

export default Searcher;
