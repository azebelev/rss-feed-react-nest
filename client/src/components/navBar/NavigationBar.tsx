import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../../enums/userRole';
import useUserStore from '../../store/userStore';
import theme from '../../theme/theme';
import { AuthBlock } from '../auth/AuthBlock';
import { ReactLogo } from '../icons/Logo';
import { AccountInfo } from './AccountInfo';
import { ChannelControl } from './ChannelControl';
import { PageLink } from './PageLink';

export function NavigationBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { user } = useUserStore(({ user }) => ({ user }));

    const pages = [
        { path: '', label: 'Home' },
        { path: 'articles', label: 'Articles' },
        ...(user?.role === UserRole.Admin ? [{ path: 'admin', label: 'Admin' }] : []),
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position='static'
            color='transparent'
            elevation={0}
            sx={{
                px: 2,
                borderBottom: `1px solid ${theme.palette.neutral5}`,
                backgroundColor: theme.palette.secondary.main,
            }}
        >
            <Toolbar>
                <ReactLogo width={50} height={50} />
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        onClick={handleOpenNavMenu}
                        color='inherit'
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id='menu-appbar'
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                <Typography
                                    textAlign='center'
                                    color={theme.palette.secondary.contrastText}
                                >
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                        }}
                                        to={`/${page.path}`}
                                    >
                                        {page.label}
                                    </Link>
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        ml: 6,
                    }}
                >
                    {pages.map((page, index) => (
                        <PageLink
                            key={page.path}
                            to={`/${page.path}`}
                            text={page.label}
                            sx={{ mr: `${index === pages.length - 1 ? '0' : '8px'}` }}
                        />
                    ))}
                </Box>
                <ChannelControl />
                {user ? <AccountInfo user={user} /> : <AuthBlock size='small' />}
            </Toolbar>
        </AppBar>
    );
}
