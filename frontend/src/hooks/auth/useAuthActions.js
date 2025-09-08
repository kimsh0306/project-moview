// hooks/auth/useAuthAcions.js
import { useDispatch } from "react-redux";
import { authenticateAction } from "store/actions/authenticateAction";

export function useAuthActions() {
  const dispatch = useDispatch();
  return {
    join: () => dispatch(authenticateAction.join()),
    login: () => dispatch(authenticateAction.login()),
    logout: () => dispatch(authenticateAction.logout()),
    extendSession: () => dispatch(authenticateAction.extendSession()),
    deleteAccount: () => dispatch(authenticateAction.deleteAccount()),
  };
}