import React from 'react';
import {
  Character as CharacterTypes,
  Technology as TechnologyTypes,
  HeadQuarter as HeadQuarterTypes,
} from '../../utils/interface/Card';
import { useStateValue } from '../../context';
import Character from '../../components/Character';
import HeadQuarter from '../../components/HeadQuarter';
import Technology from '../../components/Technology';
import './styles.scss';

type ShowedCardsTypes = {
  empty: boolean;
  characters: CharacterTypes[];
  technologies: TechnologyTypes[];
  headQuarters: HeadQuarterTypes[];
}

const getCardsToShow = () => {
  const { cards, filteredCards, searchedCards } = useStateValue();

  const result: ShowedCardsTypes = {
    empty: false,
    characters: [],
    headQuarters: [],
    technologies: [],
  };

  if (cards && cards.length <= 0) {
    result.empty = true;
    return result;
  }

  if (filteredCards && filteredCards.length > 0) {
    result.headQuarters = filteredCards?.filter((card) => card.CardType === 'HQ') as HeadQuarterTypes[];
    result.characters = filteredCards?.filter((card) => card.CardType === 'Character') as CharacterTypes[];
    result.technologies = filteredCards?.filter((card) => card.CardType === 'Technology') as TechnologyTypes[];
    return result;
  }

  if (searchedCards && searchedCards.length > 0) {
    result.headQuarters = searchedCards?.filter((card) => card.CardType === 'HQ') as HeadQuarterTypes[];
    result.characters = searchedCards?.filter((card) => card.CardType === 'Character') as CharacterTypes[];
    result.technologies = searchedCards?.filter((card) => card.CardType === 'Technology') as TechnologyTypes[];
    return result;
  }

  result.headQuarters = cards?.filter((card) => card.CardType === 'HQ') as HeadQuarterTypes[];
  result.characters = cards?.filter((card) => card.CardType === 'Character') as CharacterTypes[];
  result.technologies = cards?.filter((card) => card.CardType === 'Technology') as TechnologyTypes[];
  return result;

};

const Cards = () => {
  const { headQuarters, characters, technologies, empty } = getCardsToShow();

  if (empty) {
    return (
      <section>
        <p><strong>No hay cartas disponibles</strong></p>
      </section>
    );
  }

  return (
    <section className='Cards'>
      {headQuarters && headQuarters.length > 0 && (
        <div className='Cards__headQuarters'>
          <p className='Cards__section--title'>
            <strong>Head Quarters</strong>
          </p>
          {headQuarters.map((card) => (
            <React.Fragment key={`${card.id} ${card.CardType}`}>
              <HeadQuarter card={card as HeadQuarterTypes} />
            </React.Fragment>
          ))}
        </div>
      )}
      {characters && characters.length > 0 && (
        <div className='Cards__characters'>
          <p className='Cards__section--title'>
            <strong>Characters</strong>
          </p>
          {characters.map((card) => (
            <React.Fragment key={`${card.id} ${card.CardType}`}>
              <Character card={card as CharacterTypes} />
            </React.Fragment>
          ))}
        </div>
      )}
      {technologies && technologies.length > 0 && (
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
      )}
    </section>
  );
};

export default Cards;
