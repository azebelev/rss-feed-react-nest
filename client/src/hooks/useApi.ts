import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const useApi = () => {
    const navigate = useNavigate();

    const apiInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
        });

        instance.interceptors.request.use(
            async (config) => {
                //const accessToken = (await authenticationService.getAccessToken())?.accessToken;
                const accessToken = 'temp';
                if (accessToken) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
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
                    navigate('/unauthorized');
                }
                if (error.response?.status === StatusCodes.FORBIDDEN) {
                    //will trigger creditors list update in CreditorSelectorControl
                    //currentUser && setCurrentUser({ ...currentUser });
                }
                return Promise.reject(error);
            },
        );

        return instance;
    }, []);

    return apiInstance;
};

export const headerValues = { appJson: { 'Content-Type': 'application/json' } };
