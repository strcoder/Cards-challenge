import React, { useState } from 'react';
import { HeadQuarter as HeadQuarterTypes } from '../../utils/interface/Card';

type HeadQuarterProps = {
  card: HeadQuarterTypes
}

const HeadQuarter = ({ card }: HeadQuarterProps) => {
  const [imgUrl, setImgUrl] = useState(card.imgUrl);

  const onImgError = () => {
    setImgUrl('https://www.azendportafolio.com/static/img/not-found.png');
  };

  return (
    <div key={card.id} className='HeadQuarterCard fadeIn'>
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

export default HeadQuarter;
