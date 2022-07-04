import React, { useState } from 'react';
import { Character as CharacterTypes } from '../../utils/interface/Card';
import EmptyCard from '../EmptyCard';

type CharacterProps = {
  card: CharacterTypes;
  animation?: 'bounceIn' | 'fadeIn'
}

const Character = ({ card, animation = 'fadeIn' }: CharacterProps) => {
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
      <figure className={`CardImage ${animation}`}>
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
