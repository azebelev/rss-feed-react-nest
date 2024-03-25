import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore, { TokenDto } from '../store/userStore';
const expiredInBuffer = 60 * 2;

export const useApi = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { backendTokens, setToken } = useUserStore(({ backendTokens, setToken }) => ({
        backendTokens,
        setToken,
    }));

    const apiInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
        });

        instance.interceptors.request.use(
            async (config) => {
                if (backendTokens?.accessToken) {
                    const currentTimestamp = Math.floor(Date.now() / 1000);
                    if (backendTokens.expiresIn < currentTimestamp - expiredInBuffer) {
                        const res = await instance.post<TokenDto>('auth/refresh', {
                            Refresh: `Bearer ${backendTokens?.refreshToken}`,
                        });
                        setToken(res.data);
                        config.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
                    }
                    config.headers['Authorization'] = `Bearer ${backendTokens.accessToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response?.status === StatusCodes.UNAUTHORIZED) {
                    enqueueSnackbar('You need to be logged in', {
                        variant: 'error',
                    });
                    navigate('/');
                }
                if (error.response?.status === StatusCodes.FORBIDDEN) {
                    enqueueSnackbar('You are not accepted to tis resource', {
                        variant: 'error',
                    });
                    navigate('/forbidden');
                }
                return Promise.reject(error);
            },
        );

        return instance;
    }, [backendTokens]);

    return apiInstance;
};

export const headerValues = { appJson: { 'Content-Type': 'application/json' } };
