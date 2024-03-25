import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import { QueryKeys } from '../constants/QueryKeys';
import useChannelsStore, { Channel } from '../store/channelsStore';
import { useApi } from './useApi';

export type AddChannelDto = { feedUrl: string; id: number };
export function useChannelsService() {
    const { setActiveChannel } = useChannelsStore(({ setActiveChannel }) => ({ setActiveChannel }));
    const api = useApi();
    const { enqueueSnackbar } = useSnackbar();
    const { data, isError, refetch } = useQuery(
        [QueryKeys.channel],
        () => api.get<Channel[]>('channel'),
        {
            onSuccess: (data) => setActiveChannel(data.data[0] ?? null),
            onError: () => {
                enqueueSnackbar('Fetching channels failed', {
                    variant: 'error',
                });
            },
        },
    );

    const addChannel = (dto: { feedUrl: string }) =>
        api
            .post(`channel`, dto)
            .then(async () => {
                enqueueSnackbar('Channel added', {
                    variant: 'success',
                });
                await refetch();
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar('Failed to add channel', {
                    variant: 'error',
                });
            });

    const deleteChannel = (id: number) =>
        api
            .delete(`channel/${id}`)
            .then(async () => {
                enqueueSnackbar('Deleted', {
                    variant: 'success',
                });
                await refetch();
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar('Not deleted', {
                    variant: 'error',
                });
            });

    return {
        channels: data?.data,
        isError,
        deleteChannel,
        addChannel,
    };
}
