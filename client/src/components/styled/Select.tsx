import { Select as MuiSelect, styled } from '@mui/material';
import theme from '../../theme/theme';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export const Select = styled(MuiSelect)`
    && {
        color: ${theme.palette.secondary.contrastText};

        .MuiSelect-icon {
            color: ${theme.palette.secondary.dark};
        }
    }
`;

Select.defaultProps = {
    IconComponent: KeyboardArrowDownRoundedIcon,
};
