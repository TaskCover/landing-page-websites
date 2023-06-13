"use client";

import { store } from "store/configureStore";
import { Provider } from "react-redux";
import ThemeProvider from "./ThemeProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

export default AppProvider;
