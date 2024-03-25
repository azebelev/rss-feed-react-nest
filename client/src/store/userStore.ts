import { create } from 'zustand';
import { DefaultValueConstants } from '../constants/DefaultValueConstants';
import { UserRole } from '../enums/userRole';

export type User = {
    name: string;
    email: string;
    role: UserRole;
};

export type TokenDto = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
};
type UserStore = {
    user: User | null;
    backendTokens: TokenDto | null;
    setUser: (user: User | null) => void;
    setToken: (token: TokenDto) => void;
};
const tokens = localStorage.getItem(DefaultValueConstants.localStorageTokenKey);
const user = localStorage.getItem(DefaultValueConstants.localStorageUserKey);

const useUserStore = create<UserStore>((set) => ({
    user: user ? JSON.parse(user) : null,
    backendTokens: tokens ? JSON.parse(tokens) : null,
    setUser: (user) => {
        if (user === null) {
            set({ user, backendTokens: null });
            localStorage.removeItem(DefaultValueConstants.localStorageTokenKey);
            localStorage.removeItem(DefaultValueConstants.localStorageUserKey);
        } else {
            localStorage.setItem(DefaultValueConstants.localStorageUserKey, JSON.stringify(user));
            set({ user });
        }
    },
    setToken: (backendTokens) => {
        localStorage.setItem(
            DefaultValueConstants.localStorageTokenKey,
            JSON.stringify(backendTokens),
        );
        set({ backendTokens });
    },
}));

export default useUserStore;
