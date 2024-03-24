import { Container, Typography, useTheme } from '@mui/material';

export default function Forbidden() {
    const { palette } = useTheme();
    return (
        <Container maxWidth='sm'>
            <Typography
                variant='h5'
                align='center'
                style={{ marginTop: '50px', color: palette.error.main }}
            >
                You do not have access to view this page
            </Typography>
        </Container>
    );
}
