import MenuIcon from '@mui/icons-material/Menu';
import { Box, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';

export function Accordion({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    const shadow =
        '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)';

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'white',
                    boxShadow: shadow,
                }}
            >
                {expanded && children}
            </Box>
            <Stack direction='row' width='100%' justifyContent='center'>
                <Tooltip title={'expand search and sorting'}>
                    <MenuIcon
                        onClick={toggleExpand}
                        sx={{
                            mt: expanded ? '-16px' : '-7px',
                            pb: 0.5,
                            transform: `scale(5, ${expanded ? -0.45 : 0.45})`,
                            backgroundColor: 'white',
                            borderRadius: '0 0 100% 100%',
                            boxShadow: shadow,
                            position: 'absolute',
                            cursor: 'pointer',
                            zIndex: 10,
                        }}
                    />
                </Tooltip>
            </Stack>
        </>
    );
}
