import React from 'react';
import { GiZeusSword } from 'react-icons/gi';
import './styles.scss';

const EmptyCard = ({ card }) => {
  return (
    <div className={`EmptyCard fadeIn ${card.Faction} ${card.CardType}`}>
      <div className='EmptyCard__header'>
        <p><strong>{card.Name}</strong></p>
      </div>
      <figure className='CardImage'>
        <GiZeusSword />
      </figure>
      <div className='EmptyCard__footer'>
        <p>{card.CardNumber}</p>
      </div>
    </div>
  );
};

export default EmptyCard;
