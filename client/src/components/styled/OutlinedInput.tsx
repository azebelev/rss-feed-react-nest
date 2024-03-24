import { OutlinedInput as MuiOutlinedInput, styled } from '@mui/material';
import theme from '../../theme/theme';

export const OutlinedInput = styled(MuiOutlinedInput)`
    && {
        color: ${theme.palette.secondary.contrastText};
    }
`;
