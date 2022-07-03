import React, { useState } from 'react';
import { Technology as TecnologyTypes } from '../../utils/interface/Card';

type TechnologyProps = {
  card: TecnologyTypes
}

const Technology = ({ card }: TechnologyProps) => {
  const [imgUrl, setImgUrl] = useState(card.imgUrl);

  const onImgError = () => {
    setImgUrl('https://www.azendportafolio.com/static/img/not-found.png');
  };

  return (
    <div key={card.id} className='TechnologyCard'>
      <figure className='CardImage'>
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

export default Technology;
