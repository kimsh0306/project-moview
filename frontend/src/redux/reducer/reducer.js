const initialState = {
  myMovies: []
};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { ...state, myMovies: payload.myMovies };
    case "LOGOUT":
      return { ...state, myMovies: [] };
    case "PUT_MY_MOVIE":
      return { ...state, myMovies: [...state.myMovies, payload.myMovie] };
    case "DELETE_MY_MOVIE":
      return {
        ...state,
        myMovies: state.myMovies.filter(movie => movie.id !== payload.myMovie.id)
      };
    default:
      return { ...state };
  };
};

export default reducer;