export const setError = (error) => ({
  type: 'SET_ERROR',
  error,
});

export const setSearchedCards = (searchedCards) => ({
  type: 'SET_SEARCHED_CARDS',
  searchedCards,
});

export const setFilteredCards = (filteredCards) => ({
  type: 'SET_FILTERED_CARDS',
  filteredCards,
});

export const searchCards = ({ dispatch, cards, cardName }) => {
  try {
    const cardsFind = cards?.filter((item) => {
      return item.Name.toLowerCase().includes(cardName.toLowerCase());
    });
    dispatch(setSearchedCards(cardsFind));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const filterCards = ({ dispatch, cards, filters }) => {
  try {
    const filtersType = filters?.filter((item) => item.includes('card type'))?.map((item) => item.split('/')[1]);
    const filtersFactions = filters?.filter((item) => item.includes('factions'))?.map((item) => item.split('/')[1]);
    const filtersRarity = filters?.filter((item) => item.includes('rarity'))?.map((item) => item.split('/')[1]);
    const cardsFind = cards?.filter((card) => {
      const isTypeContained = filtersType?.find((item) => item === card?.CardType?.toLowerCase());
      const isFactionContained = filtersFactions?.find((item) => item === card?.Faction?.toLowerCase());
      const isRarityContained = filtersRarity?.find((item) => item === card?.Rarity?.toLowerCase());
      if (isTypeContained || isFactionContained || isRarityContained) {
        return true;
      }
      return false;
    });
    dispatch(setSearchedCards(cardsFind));
  } catch (error) {
    dispatch(setError(error));
  }
};
