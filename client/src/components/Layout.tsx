import { Outlet } from 'react-router-dom';
import { DebouncedGlobalLoader } from './loaders/DebouncedGlobalLoader';
import { NavigationBar } from './navBar/NavigationBar';
import { AppContainer } from './styled/AppContainer';

export function Layout() {
    return (
        <AppContainer>
            <DebouncedGlobalLoader />
            <NavigationBar />
            <Outlet />
        </AppContainer>
    );
}
