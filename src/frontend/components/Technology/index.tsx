import React, { useState } from 'react';
import { Technology as TecnologyTypes } from '../../utils/interface/Card';
import EmptyCard from '../EmptyCard';

type TechnologyProps = {
  card: TecnologyTypes;
  animation?: 'bounceIn' | 'fadeIn'
}

const Technology = ({ card, animation = 'fadeIn' }: TechnologyProps) => {
  const [error, setError] = useState(false);

  const onImgError = () => {
    setError(true);
  };

  if (error) {
    return (<EmptyCard card={card} animation={animation} />);
  }

  return (
    <div key={card.id} className={`TechnologyCard ${animation}`}>
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
