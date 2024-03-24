import { styled, TextareaAutosize as MuiTextareaAutosize } from '@mui/material';

type IProp = {
    error?: boolean;
};

export const TextareaAutosize = styled(MuiTextareaAutosize, {
    shouldForwardProp: (prop) => prop !== 'error',
})<IProp>(({ theme, error }) => ({
    width: '100%',
    borderRadius: '4px 4px 0 0',
    padding: '21px 12px 4px 12px',
    resize: 'none',
    font: 'inherit',
    color: theme.palette.secondary.contrastText,
    border: 'none',
    backgroundColor: '#F0F0F0',
    borderBottom: `1px solid ${error ? 'red' : theme.palette.secondary.dark}`,
    '&:hover': {
        borderBottomColor: theme.palette.secondary.contrastText,
        backgroundColor: '#E8E8E8',
    },
    '&:focus': {
        borderBottomColor: theme.palette.primary.main,
        boxShadow: `inset 0 -1px 0 ${theme.palette.primary.main}`,
        backgroundColor: '#F0F0F0',
    },
    '&:focus-visible': {
        outline: 'none',
    },
    '&::placeholder': {
        color: theme.palette.secondary.dark,
    },
}));
