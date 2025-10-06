// src/context/AppContext.tsx
import { createContext, useContext } from "react";
import type { AppContextType } from "../types/types";

export const AppContext = createContext<AppContextType>({
  session: null,
  loading: true,
});

export const useAppContext = () => useContext(AppContext);
