import axios from "axios";

/*
  api 요청을 줄이기 위해 db의 user 안에 myLists를 저장
  db에서 받아온 user 데이터를 auth와 myMovies로 나누어서 상태 관리
*/

function join(joinPayload) {
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/join`;
    try {
      dispatch({ type: 'JOIN_REQUEST' });
      const res = await axios.post(url, joinPayload);
      const { user_id: userId, name: userName, exp } = res.data;
      console.log('회원가입 성공:', res);
      dispatch({
        type: 'JOIN_SUCCESS',
        payload: { userId, userName, exp }
      });
    } catch (error) {
      console.error('회원가입 실패:', error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error
      });
    }
  }
}

function login(loginPayload) {
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    try {
      dispatch({ type: 'LOGIN_REQUEST' });
      const res = await axios.post(url, loginPayload, {
        withCredentials: true,
      });
      const { user_id: userId, name: userName, my_lists, exp } = res.data;
      console.log('로그인 성공:', res);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { userId, userName, exp }
      });
      // 로그인 성공 시 user 상태 설정 후 movies 상태 설정
      dispatch({
        type: 'SET_MY_MOVIES',
        payload: my_lists.movies,
      });
    } catch (error) {
      console.error('로그인 실패:', error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error
      });
    }
  }
}

function logout() {
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/logout`;
    try {
      const res = await axios.post(url, {}, { withCredentials: true });
      dispatch({ type: 'LOGOUT' });
      dispatch({ type: 'RESET_MY_MOVIES' });
      console.log('로그아웃 성공');
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };
}

function extendSession() {
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/extend_session`;
    try {
      const res = await axios.post(url, {}, { withCredentials: true });
      const { exp } = res.data;
      dispatch({ type: 'UPDATE_EXPIRATION', payload: exp });
      console.log('세션 연장 성공');
    } catch (error) {
      console.error("세션 연장 실패:", error);
    }
  };
}

export const authenticateAction = { join, login, logout, extendSession };