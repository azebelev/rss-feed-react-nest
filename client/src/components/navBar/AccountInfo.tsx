import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
//import { UserRoles } from '../types/UserTypes';
import { useTheme } from '@mui/material';
import { ConfirmationModal } from '../modals/ConfirmationModal';
import { Button } from '../styled/Button';
import { CustomMenu } from '../styled/Menu';
import { CustomTooltip } from '../styled/Tooltip';

export function AccountInfo() {
    const [modalOpen, setModalOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const { palette } = useTheme();
    const tempUser = { name: 'andrew', role: 'admin', email: 'asd@gmail.com' };

    if (!tempUser) {
        return <></>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        alert('need to add logout');
    };

    const onModalClose = () => {
        setModalOpen(false);
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <ConfirmationModal
                messages={['Are you sure you want to sign out?']}
                modalOpen={modalOpen}
                onClose={onModalClose}
                handleSubmit={handleLogout}
            />
            <CustomTooltip title={'Open account details'}>
                <IconButton size='large' onClick={handleOpenUserMenu} disableRipple>
                    <PersonIcon htmlColor={palette.secondary.contrastText} />
                </IconButton>
            </CustomTooltip>
            <CustomMenu
                sx={{
                    mt: '38px',
                    '& .MuiPaper-root': {
                        border: `1px solid ${palette.secondary.dark}`,
                        boxShadow: 'none',
                        textAlign: 'left',
                    },
                }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <Box px={1}>
                    <Typography fontSize={'16px'} color={palette.secondary.contrastText}>
                        {tempUser.name}
                    </Typography>
                    <Typography fontSize={'14px'} color={palette.secondary.dark}>
                        {tempUser.role}
                    </Typography>
                    <Typography color={palette.secondary.dark} fontSize={'14px'}>
                        {tempUser.email}
                    </Typography>
                    <Button
                        startIcon={<LogoutIcon />}
                        onClick={() => setModalOpen(true)}
                        sx={{
                            mt: '15px',
                            width: '100%',
                        }}
                    >
                        Sign out
                    </Button>
                </Box>
            </CustomMenu>
        </Box>
    );
}
