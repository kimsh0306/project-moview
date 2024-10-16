const initialState = {
  loading: false,
  user: null,
  error: null,
};

function authenticateReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN_REQUEST':
    case 'JOIN_REQUEST': 
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'JOIN_SUCCESS': 
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
    case 'JOIN_FAILURE': 
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
}

export default authenticateReducer;
