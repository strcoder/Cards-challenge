import React, { useState } from 'react';
import { Character as CharacterTypes } from '../../utils/interface/Card';
import EmptyCard from '../EmptyCard';

type CharacterProps = {
  card: CharacterTypes
}

const Character = ({ card }: CharacterProps) => {
  // const [imgUrl, setImgUrl] = useState(card.imgUrl);
  const [error, setError] = useState(false);

  const onImgError = () => {
    setError(true);
    // setImgUrl('https://www.azendportafolio.com/static/img/not-found.png');
  };

  if (error) {
    return (<EmptyCard card={card} />);
  }

  return (
    <div key={card.id}>
      <figure className='CardImage fadeIn'>
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

export default Character;
