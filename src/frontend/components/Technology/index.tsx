import React, { useState } from 'react';
import { Technology as TecnologyTypes } from '../../utils/interface/Card';
import EmptyCard from '../EmptyCard';

type TechnologyProps = {
  card: TecnologyTypes
}

const Technology = ({ card }: TechnologyProps) => {
  const [error, setError] = useState(false);

  const onImgError = () => {
    setError(true);
  };

  if (error) {
    return (<EmptyCard card={card} />);
  }

  return (
    <div key={card.id} className='TechnologyCard fadeIn'>
      <figure className='CardImage'>
        <img
          loading='lazy'
          alt={card.Name}
          src={card.imgUrl}
          onError={onImgError}
          className='img-cover'
          crossOrigin='anonymous'
        />
      </figure>
    </div>
  );
};

export default Technology;
