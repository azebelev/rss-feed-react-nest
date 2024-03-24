import { Menu, styled } from '@mui/material';
import theme from '../../theme/theme';

export const CustomMenu = styled(Menu)({
    '& .MuiPaper-root': {
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '4px',
        border: `1px solid ${theme.palette.tableBorder}`,
        boxShadow: 'none',
    },
});

CustomMenu.defaultProps = {
    MenuListProps: {
        sx: {
            '& .MuiButtonBase-root': {
                '&:hover': {
                    backgroundColor: theme.palette.tableBorder,
                },

                '&:active': {
                    backgroundColor: theme.palette.cancelActive,
                },
            },
        },
    },
};
