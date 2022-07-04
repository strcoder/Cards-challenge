import React, { useState } from 'react';
import { HeadQuarter as HeadQuarterTypes } from '../../utils/interface/Card';
import EmptyCard from '../EmptyCard';

type HeadQuarterProps = {
  card: HeadQuarterTypes
  animation?: 'bounceIn' | 'fadeIn'
}

const HeadQuarter = ({ card, animation = 'fadeIn' }: HeadQuarterProps) => {
  const [error, setError] = useState(false);

  const onImgError = () => {
    setError(true);
  };

  if (error) {
    return (<EmptyCard card={card} />);
  }

  return (
    <div key={card.id} className={`HeadQuarterCard ${animation}`}>
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

export default HeadQuarter;
