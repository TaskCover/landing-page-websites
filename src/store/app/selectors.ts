import { useCallback } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  HeaderConfig,
  Snackbar,
  addSnackbar,
  removeSnackbar,
  toggleAppReady,
  toggleExpandSidebar,
  updateHeaderConfig,
} from "./reducer";

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

export const useSidebar = () => {
  const dispatch = useAppDispatch();

  const isExpandedSidebar = useAppSelector(
    (state) => state.app.isExpandedSidebar,
  );

  const onToggleExpandSidebar = useCallback(
    (newStatus?: boolean) => {
      dispatch(toggleExpandSidebar(newStatus));
    },
    [dispatch],
  );

  return { isExpandedSidebar, onToggleExpandSidebar };
};

export const useHeaderConfig = () => {
  const dispatch = useAppDispatch();

  const { headerConfig } = useAppSelector((state) => state.app, shallowEqual);

  const onUpdateHeaderConfig = useCallback(
    (data: HeaderConfig) => {
      dispatch(updateHeaderConfig(data));
    },
    [dispatch],
  );

  return {
    headerConfig,
    ...headerConfig,
    onUpdateHeaderConfig,
  };
};
