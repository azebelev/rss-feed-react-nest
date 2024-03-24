import { create } from 'zustand';
import { UserRole } from '../enums/userRole';

export type User = {
    name: string;
    email: string;
    role: UserRole;
};
type UserStore = {
    user: User | null;
    setUser: (user: User | null) => void;
};
const useCalendarDate = create<UserStore>((set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default useCalendarDate;
