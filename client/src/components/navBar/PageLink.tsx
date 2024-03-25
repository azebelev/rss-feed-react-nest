import { Box, Button, SxProps, useTheme } from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

export function PageLink({ to, text, sx }: { to: string; text: string; sx?: SxProps }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { palette } = useTheme();

    const isActive = matchPath(
        {
            path: to,
            caseSensitive: false,
            end: true,
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
