import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { authInitialState, authReducer } from "./auth";
import { initialSystem, systemReducer } from "./system";

export const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        auth: { ...authInitialState },
        ...authReducer(set, get),
        system: { ...initialSystem },
        ...systemReducer(set, get),
      }),
      {
        name: "storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
