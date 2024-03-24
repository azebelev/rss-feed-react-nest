import { Tooltip, styled } from '@mui/material';
import theme from '../../theme/theme';

export const CustomTooltip = styled(Tooltip)``;

CustomTooltip.defaultProps = {
    placement: 'top',
    slotProps: {
        tooltip: {
            sx: {
                background: theme.palette.tooltipBackground,
                color: theme.palette.primary.contrastText,
                padding: '10px',
                fontSize: '14px',
                mb: '5px !important',
            },
        },
    },
    disableInteractive: true,
};
