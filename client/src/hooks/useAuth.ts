import { HttpStatusCode } from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import useUserStore, { TokenDto, User } from '../store/userStore';
import { useApi } from './useApi';

export type LoginDto = { password: string; email: string };
export type RegisterDto = LoginDto & { name: string };

export function useAuthService() {
    const { enqueueSnackbar } = useSnackbar();
    const api = useApi();
    const { setToken, setUser } = useUserStore(({ setUser, setToken }) => ({ setUser, setToken }));
    const navigate = useNavigate();

    const login = (dto: LoginDto) =>
        api
            .post<{ user: User } & { backendTokens: TokenDto }>('auth/login', {
                username: dto.email,
                password: dto.password,
            })
            .then(async (response) => {
                if (response.data) {
                    const { backendTokens, user } = response.data;
                    setUser(user);
                    setToken(backendTokens);
                    navigate('articles');
                }
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar('login failed', {
                    variant: 'error',
                });
            });

    const register = (dto: RegisterDto) =>
        api
            .post('auth/register', dto)
            .then(async (response) => response.status === HttpStatusCode.Created)
            .catch((error) => {
                console.log(error);
                enqueueSnackbar('register failed', {
                    variant: 'error',
                });
            });

    const logout = () => {
        setUser(null);
        enqueueSnackbar('logged out', {
            variant: 'info',
        });
    };

    return {
        login,
        register,
        logout,
    };
}
