import React, { useState } from 'react';
import { Character as CharacterTypes } from '../../utils/interface/Card';

type CharacterProps = {
  card: CharacterTypes
}

const Character = ({ card }: CharacterProps) => {
  const [imgUrl, setImgUrl] = useState(card.imgUrl);

  const onImgError = () => {
    setImgUrl('https://www.azendportafolio.com/static/img/not-found.png');
  };

  return (
    <div key={card.id}>
      <figure className='CardImage fadeIn'>
        <img
          src={imgUrl}
          loading='lazy'
          alt={card.Name}
          onError={onImgError}
          className='img-cover'
          crossOrigin='anonymous'
        />
      </figure>
    </div>
  );
};

export default Character;
