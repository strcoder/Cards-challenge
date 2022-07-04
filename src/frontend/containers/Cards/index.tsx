import React, { useState } from 'react';
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
import CardModal from '../../components/CardModal';

type ShowedCardsTypes = {
  empty: boolean;
  characters: CharacterTypes[];
  technologies: TechnologyTypes[];
  headQuarters: HeadQuarterTypes[];
}

const getCardsToShow = () => {
  const { cards, filteredCards, searchedCards, isSearched } = useStateValue();

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

  if (isSearched && searchedCards?.length === 0) {
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
  const [cardActive, setCardActive] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const { headQuarters, characters, technologies, empty } = getCardsToShow();

  const showModal = ({ card }) => {
    setCardActive(card);
    setOpenModal(true);
  };

  if (empty) {
    return (
      <section className='CardsEmpty'>
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
            <button
              type='button'
              className='CardButton'
              onClick={() => showModal({ card })}
              key={`${card.id} ${card.CardType}`}
            >
              <HeadQuarter card={card as HeadQuarterTypes} />
            </button>
          ))}
        </div>
      )}
      {characters && characters.length > 0 && (
        <div className='Cards__characters'>
          <p className='Cards__section--title'>
            <strong>Characters</strong>
          </p>
          {characters.map((card) => (
            <button
              type='button'
              className='CardButton'
              onClick={() => showModal({ card })}
              key={`${card.id} ${card.CardType}`}
            >
              <Character card={card as CharacterTypes} />
            </button>
          ))}
        </div>
      )}
      {technologies && technologies.length > 0 && (
        <div className='Cards__technologies'>
          <p className='Cards__section--title'>
            <strong>Technologies</strong>
          </p>
          {technologies?.map((card) => (
            <button
              type='button'
              className='CardButton'
              onClick={() => showModal({ card })}
              key={`${card.id} ${card.CardType}`}
            >
              <Technology card={card as TechnologyTypes} />
            </button>
          ))}
        </div>
      )}
      <CardModal
        card={cardActive}
        showModal={openModal}
        OnCloseModal={() => setOpenModal(false)}
      />
    </section>
  );
};

export default Cards;
