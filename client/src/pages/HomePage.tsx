import { Box, Container, Typography } from '@mui/material';
import { AuthBlock } from '../components/auth/AuthBlock';

export function HomePage() {
    return (
        <Container maxWidth='sm'>
            <Box textAlign='center' mt={1}>
                <Typography variant='h3' component='h1' gutterBottom>
                    Welcome to Article Manager
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Sign up with a new user or use an existing one with admin role credentials:
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Email: admin@gmail.com
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Password: 123
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Only Admin is closed for any non-admin role. All registered users have the role
                    'User', so to check admin functionality, log in as described before using the
                    predefined user (admin@gmail.com).
                </Typography>
                <Typography variant='body1' gutterBottom>
                    To extract filtering and sorting, there is a button under the navbar at the
                    center.
                </Typography>
                <Typography variant='body1' gutterBottom>
                    There is an account details icon on the left part of the navbar. It will appear
                    if the user is logged in. You can see the role.
                </Typography>
                <Typography variant='body1' gutterBottom>
                    On admin page on article click your are able to change articles but on article
                    page you will be redirected to full version
                </Typography>
                <Typography variant='body1' gutterBottom>
                    If you are logged in as an admin, you could add a new resource from the resource
                    select in the navbar. For example, use this link:
                    https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml or another one from The
                    New York Times.
                </Typography>
                <Box mt={4}>
                    <AuthBlock size='medium' />
                </Box>
            </Box>
        </Container>
    );
}
