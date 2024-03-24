import { ThemeProvider } from '@emotion/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import Forbidden from './pages/Forbidden';
import theme from './theme/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HomePage } from './pages/HomePage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/users-page' element={<UserPage />} />
                        <Route path='/admin' element={<AdminPage />} />
                        <Route path='/forbidden' element={<Forbidden />} />
                    </Route>
                </Routes>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;

//<Route path='/' element={<Navigate to='/users-page' replace />} />
