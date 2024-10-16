const initialState = {
  movies: [],
};

function myMoviesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_MY_MOVIES":
      return { ...state, movies: payload };
    case "ADD_MY_MOVIES":
      // 중복 추가 방지
      if (state.movies.some(movie => movie.id === payload.movie.id)) {
        console.error("에러: 찜 영화 중복")
        return state;
      }
      return { ...state, movies: [...state.movies, payload.movie] };
    case "REMOVE_MY_MOVIES":
      return {
        ...state,
        movies: state.movies.filter(
          (movie) => movie.id !== payload.movie.id
        ),
      };
    case "RESET_MY_MOVIES":
      return { ...initialState };
    default:
      return state;
  }
}

export default myMoviesReducer;
