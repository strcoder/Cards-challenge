const reducer = (state: any, payload: any) => {
  switch (payload.type) {
    case 'SET_ERROR':
      return state;
    case 'SET_FILTERED_CARDS':
      return {
        ...state,
        isSearched: false,
        filteredCards: [...payload.filteredCards],
      };
    case 'SET_SEARCHED_CARDS':
      return {
        ...state,
        isSearched: true,
        searchedCards: [...payload.searchedCards],
      };
    default: return state;
  }
};

export default reducer;
