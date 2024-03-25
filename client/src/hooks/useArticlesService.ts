import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { UpdateArticleFormData } from '../components/form/formsConfigs/updateArticleFormConfig';
import { IPaginationReady } from '../components/pagination/ServerSidePagination';
import { DefaultValueConstants } from '../constants/DefaultValueConstants';
import { QueryKeys } from '../constants/QueryKeys';
import { SortingEnum } from '../enums/sortingEnum';
import useChannelsStore from '../store/channelsStore';
import { getUrlParams } from '../utils/getUrlParams';
import { useApi } from './useApi';

export type ArticleDto = {
    id: number;
    externalGuid: string;
    title: string;
    content: string;
    link: string;
    pubDate: Date;
    creator: string;
    mediaType?: string;
    mediaUrl?: string;
    mediaCredit?: string;
};
export type ArticlesResponseDto = {
    articles: ArticleDto[];
    count: number;
};

export type UpdateArticleDto = Partial<Omit<ArticleDto, 'id'>>;

export const deflateQueryObject = {
    page: DefaultValueConstants.defaultPage,
    pageSize: DefaultValueConstants.defaultPageSize,
    pubDateSorting: SortingEnum.Desc,
    search: '',
};

export interface QueryObject extends IPaginationReady {
    pubDateSorting: SortingEnum;
    search: string;
}

export function useArticlesService() {
    const queryClient = new QueryClient();
    const [queryObject, setQueryObject] = useState<QueryObject>(deflateQueryObject);
    const api = useApi();
    const { activeChannel } = useChannelsStore(({ activeChannel }) => ({ activeChannel }));
    const { enqueueSnackbar } = useSnackbar();
    const fetchArticles = () => {
        return activeChannel?.id
            ? api.get<ArticlesResponseDto>(
                  `article/channel/${activeChannel?.id}/?${getUrlParams(queryObject)}`,
              )
            : undefined;
    };
    const {
        data,
        isError,
        isLoading: isLoadingChannels,
        refetch,
    } = useQuery([QueryKeys.articles, activeChannel?.id], fetchArticles, {
        onError: () => {
            enqueueSnackbar('Fetching resource failed', {
                variant: 'error',
            });
        },
    });
    const { mutate, isLoading: isMutationLoading } = useMutation(
        (prop: { dto: UpdateArticleDto; articleId: number }) =>
            api.patch(`article/${prop.articleId}`, prop.dto),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries([QueryKeys.articles, activeChannel?.id]);
                enqueueSnackbar('Updated', {
                    variant: 'success',
                });
                refetch();
            },
            onError: () => {
                enqueueSnackbar('Update failed', {
                    variant: 'error',
                });
            },
        },
    );

    const updateArticle = async (formData: UpdateArticleFormData, articleId: number) => {
        const articleForUpdate = { ...formData, pubDate: new Date(formData.pubDate) };
        mutate({ dto: articleForUpdate, articleId });
    };

    const deleteArticle = async (id: number) => {
        await api
            .delete(`article/${id}`)
            .then(() => {
                setQueryObject({ ...queryObject });
                enqueueSnackbar('Deleted', {
                    variant: 'success',
                });
                refetch();
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar('Not deleted', {
                    variant: 'error',
                });
            });
    };

    useEffect(() => {
        refetch();
    }, [queryObject, refetch]);

    return {
        queryObject,
        setQueryObject,
        data: data?.data,
        isError,
        isLoading: isLoadingChannels || isMutationLoading,
        updateArticle,
        deleteArticle,
    };
}
