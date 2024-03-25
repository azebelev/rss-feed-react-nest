import { ThemeProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import AdminPage from './pages/AdminPage';
import ArticlesPage from './pages/ArticlesPage';
import Forbidden from './pages/Forbidden';
import { HomePage } from './pages/HomePage';
import theme from './theme/theme';

const queryClient = new QueryClient();

function App() {
    return (
        // <UnhandledErrorBoundary>
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/articles' element={<ArticlesPage />} />
                            <Route path='/admin' element={<AdminPage />} />
                            <Route path='/forbidden' element={<Forbidden />} />
                        </Route>
                    </Routes>
                </QueryClientProvider>
            </ThemeProvider>
        </SnackbarProvider>
        // </UnhandledErrorBoundary>
    );
}

export default App;
