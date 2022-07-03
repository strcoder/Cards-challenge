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
      <figure style={{ width: '50px', height: '50px' }}>
        <img
          src={imgUrl}
          loading='lazy'
          alt={card.Name}
          onError={onImgError}
          crossOrigin='anonymous'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </figure>
    </div>
  );
};

export default Character;
