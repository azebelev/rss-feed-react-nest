import { Box, Button, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { RegisterDto, useAuthService } from '../../hooks/useAuth';
import useUserStore from '../../store/userStore';
import { FormWithValidation } from '../form/FormWithValidation';
import { getLoginFormConfig, getRegisterFormConfig } from '../form/formsConfigs/authFormConfigs';
import { CustomDialog } from '../styled/Dialog';

export function AuthBlock({ size }: { size: 'small' | 'medium' }) {
    const { login, register } = useAuthService();
    const { user } = useUserStore(({ user }) => ({ user }));
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [signUpModalOpen, setSignUpModalOpen] = useState(false);

    const handleRegistration = async (formData: RegisterDto) => {
        if (await register(formData)) setLoginModalOpen(true);
    };

    return (
        <>
            <CustomDialog
                open={signUpModalOpen}
                onClose={() => setSignUpModalOpen(false)}
                sx={{ textAlign: 'center' }}
            >
                <DialogTitle mx={5}>Enter your credentials for registration</DialogTitle>
                <DialogContent>
                    <FormWithValidation
                        onSubmit={handleRegistration}
                        onClose={() => setSignUpModalOpen(false)}
                        config={getRegisterFormConfig()}
                        submitButtonText='Sign Up'
                    />
                </DialogContent>
            </CustomDialog>
            <CustomDialog
                open={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                sx={{ textAlign: 'center' }}
            >
                <DialogTitle mx={5}>Enter your credentials for login</DialogTitle>
                <DialogContent>
                    <FormWithValidation
                        onSubmit={login}
                        onClose={() => setLoginModalOpen(false)}
                        config={getLoginFormConfig()}
                        submitButtonText='Login'
                    />
                </DialogContent>
            </CustomDialog>
            {!user ? (
                <Box ml={2}>
                    <Button
                        onClick={() => setSignUpModalOpen(true)}
                        size={size}
                        variant='contained'
                        color='primary'
                    >
                        Sign Up
                    </Button>
                    <Button
                        onClick={() => setLoginModalOpen(true)}
                        size={size}
                        variant='outlined'
                        color='primary'
                        style={{ marginLeft: '16px' }}
                    >
                        Log In
                    </Button>
                </Box>
            ) : null}
        </>
    );
}
