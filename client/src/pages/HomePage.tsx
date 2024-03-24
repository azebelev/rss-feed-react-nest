import { Box, Button, Container, Typography } from '@mui/material';

export function HomePage() {
    return (
        <Container maxWidth='sm'>
            <Box textAlign='center' mt={8}>
                <Typography variant='h2' component='h1' gutterBottom>
                    Welcome to Article Manager
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Sign up with a new user or use existing one with admin role credentials:
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Email: admin@gmail.com
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Password: 123
                </Typography>
                <Box mt={4}>
                    <Button variant='contained' color='primary'>
                        Sign Up
                    </Button>
                    <Button variant='outlined' color='primary' style={{ marginLeft: '16px' }}>
                        Log In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
