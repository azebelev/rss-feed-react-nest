import { styled, TextField } from '@mui/material';

const StyledTextField = styled(TextField)`
    margin-bottom: 4px;
`;

StyledTextField.defaultProps = {
    fullWidth: true,
    variant: 'filled',
    size: 'small',
};

export { StyledTextField };
