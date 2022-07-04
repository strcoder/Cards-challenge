/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import './styles.scss';

type FiltersProps = {
  filters: {
    type: string;
    value: string;
  }[];
  onClose: () => void;
  onSubmit: (arg0: any) => void;
}

const Filters = ({ filters, onSubmit, onClose }: FiltersProps) => {
  const { register, handleSubmit } = useForm();
  const [optionsActive, setOptionsActive] = useState<string[]>([]);

  const handleOptionActive = (e: any) => {
    let list = optionsActive;
    const isActive = optionsActive.find((item) => item === e.target.value);
    if (!isActive) {
      list.push(e.target.value);
    } else {
      list = list.filter((item) => item !== e.target.value);
    }
    setOptionsActive([...list]);
  };

  return (
    <section className='Filters'>
      <p><strong>Filters</strong></p>
      <button
        type='button'
        onClick={onClose}
        title='Close filter'
        className='Filters--close'
      >
        Close
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className='Filters__container'>
        {filters.map((filter) => (
          <React.Fragment key={`${filter.type} ${filter.value}`}>
            {filter.type === 'title' && (
              <p className='Filters__container--title'>
                <strong>{filter.value}</strong>
              </p>
            )}
            {filter.type === 'option' && (
              <label className='Filters__container--option' htmlFor={`${filter.value}Checkbox`}>
                <div className='Option--box'>
                  {optionsActive.find((item) => item === filter.value.toLowerCase()) && (
                    <BsCheck />
                  )}
                </div>
                <input
                  type='checkbox'
                  id={`${filter.value}Checkbox`}
                  value={filter.value.toLowerCase()}
                  {...register(`${filter.value}Checkbox`, {
                    onChange: handleOptionActive,
                  })}
                />
                <p>{filter.value}</p>
              </label>
            )}
          </React.Fragment>
        ))}
        <button
          type='submit'
          className='Filters__container--button btn-primary'
        >
          Apply
        </button>
      </form>
    </section>
  );
};

export default Filters;
