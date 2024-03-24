import MenuIcon from '@mui/icons-material/Menu';
import { SxProps, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import theme from '../../theme/theme';
import { ReactLogo } from '../icons/Logo';
import { AccountInfo } from './AccountInfo';
import { ChannelControl } from './ChannelControl';

export function NavigationBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const pages = [
        { path: 'users-page', label: 'Users Page' },
        { path: 'admin', label: 'Admin' },
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
                        <CustomLink
                            key={page.path}
                            to={`/${page.path}`}
                            text={page.label}
                            sx={{ mr: `${index === pages.length - 1 ? '0' : '8px'}` }}
                        />
                    ))}
                </Box>
                <ChannelControl />
                <AccountInfo />
            </Toolbar>
        </AppBar>
    );
}

function CustomLink({ to, text, sx }: { to: string; text: string; sx?: SxProps }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { palette } = useTheme();

    const isActive = matchPath(
        {
            path: to,
            caseSensitive: false,
            end: false,
        },
        pathname,
    );

    const handleButtonClick = () => {
        navigate(to);
    };

    return (
        <Button
            onClick={handleButtonClick}
            sx={{
                px: '20px',
                '&:hover': { backgroundColor: palette.tableBorder },
                backgroundColor: isActive ? palette.primary.light : 'inherit',
                textTransform: 'none',
                ...sx,
            }}
        >
            <Box
                sx={{
                    textDecoration: 'none',
                    color: isActive ? palette.primary.dark : palette.secondary.contrastText,
                    fontSize: '16px',
                }}
            >
                {text}
            </Box>
        </Button>
    );
}
