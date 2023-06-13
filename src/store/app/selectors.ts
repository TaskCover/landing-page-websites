import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  addSnackbar,
  clearAuth,
  removeSnackbar,
  Snackbar,
  toggleAppReady,
} from "./reducer";
import {
  ResetPasswordData,
  SigninData,
  SignupData,
  forgot,
  resetPassword,
  signin,
  signup,
  signupVerify,
} from "./actions";
import { shallowEqual } from "react-redux";

export const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const snackbarList = useAppSelector((state) => state.app.snackbarList);

  const onAddSnackbar = useCallback(
    (
      message: Snackbar["message"],
      severity?: Snackbar["severity"],
      expiredIn?: Snackbar["expiredIn"],
    ) => {
      dispatch(addSnackbar({ message, severity, expiredIn }));
    },
    [dispatch],
  );

  const onRemoveSnackbar = useCallback(
    (snackbarId: string) => {
      dispatch(removeSnackbar(snackbarId));
    },
    [dispatch],
  );

  return {
    snackbarList,
    onAddSnackbar,
    onRemoveSnackbar,
  };
};

export const useAppReady = () => {
  const dispatch = useAppDispatch();

  const appReady = useAppSelector((state) => state.app.appReady);

  const onToggleAppReady = useCallback(
    (newStatus?: boolean) => {
      dispatch(toggleAppReady(newStatus));
    },
    [dispatch],
  );

  return { appReady, onToggleAppReady };
};

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const { token, user, signupStep } = useAppSelector(
    (state) => state.app,
    shallowEqual,
  );

  const isLoggedIn = useMemo(() => !!token, [token]);

  const onSignin = useCallback(
    async (data: SigninData) => {
      try {
        return await dispatch(signin(data)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onSignup = useCallback(
    async (data: SignupData) => {
      try {
        return await dispatch(signup(data)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onVerify = useCallback(
    async (code: string) => {
      try {
        return await dispatch(signupVerify(code)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onForgot = useCallback(
    async (email: string) => {
      try {
        return await dispatch(forgot(email)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onResetPassword = useCallback(
    async (data: ResetPasswordData) => {
      try {
        return await dispatch(resetPassword(data)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onSignOut = useCallback(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  return {
    token,
    user,
    isLoggedIn,
    onSignin,
    onSignup,
    onSignOut,
    signupStep,
    onVerify,
    onForgot,
    onResetPassword,
  };
};
