/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BsCheck } from 'react-icons/bs';
import './styles.scss';

type FilterProps = {
  value: string;
  register: any;
  actives: string[];
}

const FilterCheckbox = ({ actives, value, register }: FilterProps) => {
  return (
    <label className='Filter' htmlFor={`${value}Checkbox`}>
      <div className='Filter__box'>
        {actives.find((item) => item === value.toLowerCase()) && (
          <BsCheck />
        )}
      </div>
      <input
        type='checkbox'
        id={`${value}Checkbox`}
        value={value.toLowerCase()}
        {...register}
      />
      <p>{value.split('/')[1]}</p>
    </label>
  );
};

export default FilterCheckbox;
