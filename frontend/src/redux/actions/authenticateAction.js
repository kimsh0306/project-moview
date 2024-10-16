import axios from "axios";

/*
  api 요청을 줄이기 위해 db의 user 안에 myLists를 저장
  db에서 받아온 user 데이터를 auth와 myMovies로 나누어서 상태 관리
*/
function login(loginPayload) {
  return async (dispatch) => {
    const url = "https://project-moview-api.vercel.app/users/login";
    try {
      dispatch({ type: 'LOGIN_REQUEST' });
      const res = await axios.post(url, loginPayload);
      const { _id: userNum, user_id: userId, my_lists } = res.data;
      console.log('로그인 성공:', res);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { userNum, userId }
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
  return (dispatch) => {
    try {
      dispatch({ type: 'LOGOUT' });
      dispatch({ type: 'RESET_MY_MOVIES' });
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };
}

function join(joinPayload) {
  return async (dispatch) => {
    const url = "https://project-moview-api.vercel.app/users";
    try {
      dispatch({ type: 'JOIN_REQUEST' });
      const res = await axios.post(url, joinPayload);
      const { _id: userNum, user_id: userId, name: userName } = res.data;
      console.log('회원가입 성공:', res);
      dispatch({
        type: 'JOIN_SUCCESS',
        payload: { userNum, userId, userName }
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

export const authenticateAction = { login, logout, join };