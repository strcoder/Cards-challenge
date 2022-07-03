import React from 'react';
import {
  Character as CharacterTypes,
  Technology as TechnologyTypes,
  HeadQuarter as HeadQuarterTypes,
} from '../../utils/interface/Card';
import { useStateValue } from '../../context';
import Character from '../../components/Character';
import HeadQuarter from '../../components/HeadQuarter';
import Technologie from '../../components/Technologie';

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
        <React.Fragment key={`${card.id} ${card.CardType}`}>
          {card.CardType === 'HQ' && (
            <HeadQuarter card={card as HeadQuarterTypes} />
          )}
          {card.CardType === 'Character' && (
            <Character card={card as CharacterTypes} />
          )}
          {card.CardType === 'Technology' && (
            <Technologie card={card as TechnologyTypes} />
          )}
        </React.Fragment>
      ))}
    </section>
  );
};

export default Cards;
