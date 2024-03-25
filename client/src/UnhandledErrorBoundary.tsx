import { Box, Typography, useTheme } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/styled/Button';

function FallbackComponent() {
    const { palette } = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                pb: 5,
            }}
        >
            <Typography
                sx={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: palette.error.main,
                }}
            >
                Error
            </Typography>
            <Typography
                sx={{
                    padding: '10px 0',
                    fontSize: '16px',
                    textAlign: 'justify',
                }}
            >
                Oops! Something went wrong!
            </Typography>
            <Button onClick={() => navigate('/user-page')} sx={{ mt: 2 }}>
                Go back
            </Button>
        </Box>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UnhandledErrorBoundary(props: any) {
    return (
        <ErrorBoundary
            FallbackComponent={FallbackComponent}
            onError={(error: any) => {
                console.log(error);
            }}
        >
            {props.children}
        </ErrorBoundary>
    );
}
