import { MainAppProps } from "constants/commonTypes";
import { Users } from "Models/userModel";
import React from "react";
import { createContext } from "react";

export const AppContext = createContext<MainAppProps>({
  user: new Users(),
  setUser: () => {},
});

type AppProviderProps = {
  children: React.ReactNode;
  state: MainAppProps;
};

export const AppProvider = (props: AppProviderProps) => {
  const { children, state } = props;
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
}
