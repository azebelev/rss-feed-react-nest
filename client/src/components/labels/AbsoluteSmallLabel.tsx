import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';

export function AbsoluteSmallLabel({ error, labelText }: { error?: boolean; labelText: string }) {
    const { palette } = useTheme();
    return (
        <Box
            sx={{
                transform: 'translate(12px,6px)',
                zIndex: 1,
                position: 'absolute',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '14px',
                color: error ? palette.error.main : 'inherit',
            }}
        >
            {labelText}
        </Box>
    );
}
