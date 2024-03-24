import { create } from 'zustand';

export type Channel = {
    id: number;
    title: string;
    feedUrl: string;
};
type ChannelsStore = {
    activeChannel: Channel | null;
    setActiveChannel: (channel: Channel | null) => void;
};
const useChannelsStore = create<ChannelsStore>((set, get) => ({
    activeChannel: null,
    setActiveChannel: (channel) => set({ activeChannel: channel }),
}));

export default useChannelsStore;
