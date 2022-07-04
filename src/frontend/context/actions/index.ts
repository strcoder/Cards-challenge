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
    const filterRarity = filters?.find((item) => item.includes('rarity'));
    const filterType = filters?.find((item) => item.includes('card type'));
    const filterFaction = filters?.find((item) => item.includes('factions'));
    let list = cards;

    if (filterType) {
      list = list?.filter((card) => card.CardType.toLowerCase() === filterType.split('/')[1]);
    }
    if (filterFaction) {
      list = list?.filter((card) => card.Faction.toLowerCase() === filterFaction.split('/')[1]);
    }
    if (filterRarity) {
      list = list?.filter((card) => card.Rarity.toLowerCase() === filterRarity.split('/')[1]);
    }
    dispatch(setSearchedCards(list));
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  }
};
