import { create } from "zustand";

interface State {
  isAuthenticated: boolean;
  accessToken: string | null;
  username: string;

  authUser: (accessToken: string, username: string) => void;
  logoutUser: () => void;
  setAccessToken: (token: string) => void;
}

const useStore = create<State>()((set) => ({
  isAuthenticated: false,
  accessToken: null,
  username: "",

  authUser: (accessToken: string, username: string) =>
    set({
      isAuthenticated: true,
      accessToken: accessToken,
      username: username,
    }),
  logoutUser: () => set({ isAuthenticated: false, accessToken: null }),
  setAccessToken: (token: string) => set({ accessToken: token }),
}));

export default useStore;
