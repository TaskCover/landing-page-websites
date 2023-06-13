import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  addSnackbar,
  clearAuth,
  removeSnackbar,
  Snackbar,
  toggleAppReady,
} from "./reducer";
import { SigninData, signin } from "./actions";
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

  const { token, user } = useAppSelector((state) => state.app, shallowEqual);

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

  const onSignOut = useCallback(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  return {
    token,
    user,
    isLoggedIn,
    onSignin,
    onSignOut,
  };
};
