const reducer = (state: any, payload: any) => {
  switch (payload.type) {
    case 'SET_ERROR':
      return state;
    default: return state;
  }
};

export default reducer;
