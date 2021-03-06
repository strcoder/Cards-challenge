/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { filters } from './filters';
import { useStateValue } from '../../context';
import { filterCards } from '../../context/actions';
import FilterCheckbox from '../../components/FilterCheckbox';
import './styles.scss';

type FiltersProps = {
  onClose: () => void;
  showFilters: boolean;
}

const Filters = ({ showFilters, onClose }: FiltersProps) => {
  const { cards, dispatch } = useStateValue();
  const { register, handleSubmit, reset } = useForm();
  const [optionsActive, setOptionsActive] = useState<string[]>([]);

  const handleOptionActive = (e: any) => {
    let list = optionsActive;
    const isActive = optionsActive.find((item) => item === e.target.value);
    const isUnique = optionsActive.find((item) => item.split('/')[0].includes(e.target.value.split('/')[0]));
    if (isUnique && isUnique !== e.target.value) {
      list = list.filter((item) => item !== isUnique);
      list.push(e.target.value);
      setOptionsActive([...list]);
      return;
    }
    if (!isActive) {
      list.push(e.target.value);
    } else {
      list = list.filter((item) => item !== e.target.value);
    }
    setOptionsActive([...list]);
  };

  const onSubmit = (data) => {
    const actives = Object?.values(data)?.filter((item) => item);
    filterCards({ cards, dispatch, filters: actives });
    reset({
      Awaken: false,
      Character: false,
      Common: false,
      Entropy: false,
      Inhuman: false,
      Legendary: false,
      Owner: false,
      Rare: false,
      Technology: false,
      Uncommon: false,
      Undeviant: false,
    });
    setOptionsActive([]);
    onClose();
  };

  if (!showFilters) {
    return null;
  }

  return (
    <section className='Filters bounceInLeft'>
      <p><strong>Filters</strong></p>
      <button
        type='button'
        onClick={onClose}
        title='Close filter'
        className='Filters--close bounceInLeft'
      >
        Close
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className='Filters__container'>
        {filters.map((filter) => (
          <React.Fragment key={`${filter.title}`}>
            <p className='Filters__container--title'>
              <strong>{filter.title}</strong>
            </p>
            {filter.options.map((option) => (
              <React.Fragment key={`${filter.title} ${option}`}>
                <FilterCheckbox
                  actives={optionsActive}
                  value={`${filter.title}/${option}`}
                  register={register(`${option}`, {
                    onChange: handleOptionActive,
                  })}
                />
              </React.Fragment>
            ))}
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
