import React from 'react';
import Card from '../../components/Card';
import { useStateValue } from '../../context';

const Cards = () => {
  const { cards } = useStateValue();

  if (!cards || cards.length === 0) {
    return (
      <section>
        <p><strong>No hay cartas disponibles</strong></p>
      </section>
    );
  }

  return (
    <section className='Cards'>
      {cards?.map((card) => (
        <React.Fragment key={card.id}>
          <Card card={card} />
        </React.Fragment>
      ))}
    </section>
  );
};

export default Cards;
