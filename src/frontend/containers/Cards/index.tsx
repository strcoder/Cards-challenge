import React from 'react';
import {
  Character as CharacterTypes,
  Technology as TechnologyTypes,
  HeadQuarter as HeadQuarterTypes,
} from '../../utils/interface/Card';
import { useStateValue } from '../../context';
import Character from '../../components/Character';
import HeadQuarter from '../../components/HeadQuarter';
import Technology from '../../components/Technologie';
import './styles.scss';

const Cards = () => {
  const { cards } = useStateValue();
  const headQuarters = cards?.filter((card) => card.CardType === 'HQ');
  const characters = cards?.filter((card) => card.CardType === 'Character');
  const technologies = cards?.filter((card) => card.CardType === 'Technology');

  if (!cards || cards.length === 0) {
    return (
      <section>
        <p><strong>No hay cartas disponibles</strong></p>
      </section>
    );
  }

  return (
    <section className='Cards'>
      <div className='Cards__headQuarters'>
        <p className='Cards__section--title'>
          <strong>Head Quarters</strong>
        </p>
        {headQuarters?.map((card) => (
          <React.Fragment key={`${card.id} ${card.CardType}`}>
            <HeadQuarter card={card as HeadQuarterTypes} />
          </React.Fragment>
        ))}
      </div>
      <div className='Cards__characters'>
        <p className='Cards__section--title'>
          <strong>Characters</strong>
        </p>
        {characters?.map((card) => (
          <React.Fragment key={`${card.id} ${card.CardType}`}>
            <Character card={card as CharacterTypes} />
          </React.Fragment>
        ))}
      </div>
      <div className='Cards__technologies'>
        <p className='Cards__section--title'>
          <strong>Technologies</strong>
        </p>
        {technologies?.map((card) => (
          <React.Fragment key={`${card.id} ${card.CardType}`}>
            <Technology card={card as TechnologyTypes} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Cards;
