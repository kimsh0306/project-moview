import axios from "axios";
import getErrorMessage from "../../utils/getErrorMessage";

/*
  api 요청을 줄이기 위해 db의 user 안에 myLists를 저장
  db에서 받아온 user 데이터를 auth와 myMovies로 나누어서 상태 관리
*/

function join(joinPayload) {
  return async (dispatch) => {
    dispatch({ type: 'RESET_ERROR' });
    const url = `${process.env.REACT_APP_API_URL}/auth/join`;
    try {
      dispatch({ type: 'JOIN_REQUEST' });
      const res = await axios.post(url, joinPayload, {
        withCredentials: true,
      });
      const { user_id: userId, name: userName, exp } = res.data;
      dispatch({
        type: 'JOIN_SUCCESS',
        payload: { userId, userName, exp }
      });
      console.log('회원가입 성공:', res);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch({
        type: 'JOIN_FAILURE',
        payload: errorMessage
      });
      console.error('회원가입 실패:', error);
    }
  }
}

function login(loginPayload) {
  return async (dispatch) => {
    dispatch({ type: 'RESET_ERROR' });
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    try {
      dispatch({ type: 'LOGIN_REQUEST' });
      const res = await axios.post(url, loginPayload, {
        withCredentials: true,
      });
      const { user_id: userId, name: userName, my_lists, exp } = res.data;
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { userId, userName, exp }
      });
      // 로그인 성공 시 user 상태 설정 후 movies 상태 설정
      dispatch({
        type: 'SET_MY_MOVIES',
        payload: my_lists.movies,
      });
      console.log('로그인 성공:', res);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      console.error('로그인 실패:', error);
    }
  }
}

function logout() {
  return async (dispatch) => {
    dispatch({ type: 'RESET_ERROR' });
    const url = `${process.env.REACT_APP_API_URL}/auth/logout`;
    try {
      const res = await axios.post(url, {}, { withCredentials: true });
      dispatch({ type: 'LOGOUT' });
      dispatch({ type: 'RESET_MY_MOVIES' });
      console.log("로그아웃 성공:", res);
    } catch (error) {
      console.error("로그아웃 실패:", error);
      throw error;
    }
  };
}

const resetError = () => ({
  type: 'RESET_ERROR'
});

function extendSession() {
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/extend_session`;
    try {
      const res = await axios.post(url, {}, { withCredentials: true });
      const { exp } = res.data;
      dispatch({ type: 'UPDATE_EXPIRATION', payload: exp });
      console.log('세션 연장 성공:', res);
    } catch (error) {
      console.error("세션 연장 실패:", error);
      throw error;
    }
  };
}

function deleteAccount() {
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/delete_account`;
    try {
      const res = await axios.delete(url, { withCredentials: true });
      dispatch({ type: 'DELETE_ACCOUNT' });
      dispatch({ type: 'RESET_MY_MOVIES' });
      console.log("회원탈퇴 성공:", res);
    } catch (error) {
      console.log('회원탈퇴 실패:', error);
      throw error;
    }
  }
}

export const authenticateAction = {
  join,
  login,
  logout,
  resetError,
  extendSession,
  deleteAccount
};