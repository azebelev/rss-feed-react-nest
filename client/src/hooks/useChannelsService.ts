import { useQuery } from 'react-query';
import { QueryKeys } from '../constants/QueryKeys';
import useChannelsStore, { Channel } from '../store/channelsStore';
import { useApi } from './useApi';

export type AddChannelDto = { feedUrl: string; id: number };
export function useChannelsService() {
    const { setActiveChannel } = useChannelsStore(({ setActiveChannel }) => ({ setActiveChannel }));
    const api = useApi();
    const { data, isError, refetch } = useQuery(
        [QueryKeys.channel],
        () => api.get<Channel[]>('channel'),
        {
            onSuccess: (data) => setActiveChannel(data.data[0] ?? null),
        },
    );

    const addChannel = (dto: { feedUrl: string }) =>
        api
            .post(`channel`, dto)
            .then(async () => {
                await refetch();
            })
            .catch((error) => console.log(error));

    const deleteChannel = (id: number) =>
        api
            .delete(`channel/${id}`)
            .then(async () => {
                await refetch();
            })
            .catch((error) => console.log(error));

    return {
        channels: data?.data,
        isError,
        deleteChannel,
        addChannel,
    };
}
