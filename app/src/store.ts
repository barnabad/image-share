import { create } from "zustand";

interface State {
  accessToken: string | null;
  userId: string | null;

  authUser: (accessToken: string, userId: string) => void;
  logoutUser: () => void;
  setAccessToken: (token: string) => void;
}

const useStore = create<State>()((set) => ({
  accessToken: null,
  userId: null,

  authUser: (accessToken: string, userId: string) =>
    set({
      accessToken: accessToken,
      userId: userId,
    }),
  logoutUser: () => set({ accessToken: null, userId: null }),
  setAccessToken: (token: string) => set({ accessToken: token }),
}));

export default useStore;
