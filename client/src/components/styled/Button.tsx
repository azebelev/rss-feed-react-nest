import { CSSObject, Button as MuiButton, styled } from '@mui/material';
import theme from '../../theme/theme';

const commonButtonStyles: CSSObject = {
    fontSize: '16px',
    textTransform: 'none',
    borderRadius: '4px',
    height: '32px',
    padding: '5.5px 20px',
    transition: 'none',
    textWrap: 'nowrap',
    whiteSpace: 'nowrap',
    '& svg': {
        fontSize: '24px',
    },
    lineHeight: 'normal',
};

export const Button = styled(MuiButton)`
    && {
        ${commonButtonStyles}
        background-color: ${({ color }) =>
            color === 'primary' ? theme.palette.primary.main : theme.palette.primary.light};
        color: ${({ color }) =>
            color === 'primary'
                ? theme.palette.primary.contrastText
                : theme.palette.secondary.contrastText};
        border: ${({ color }) =>
            color === 'primary' ? 'none' : `1px solid ${theme.palette.primary.main}`};

        & svg {
            fill: ${({ color }) =>
                color === 'primary'
                    ? theme.palette.primary.contrastText
                    : theme.palette.secondary.contrastText};
        }

        &:hover {
            background-color: ${({ color }) =>
                color === 'primary' ? theme.palette.primaryHover : theme.palette.brandHovedfarge};
        }

        &:active {
            background-color: ${({ color }) =>
                color === 'primary' ? theme.palette.primaryActive : theme.palette.primary.main};
        }

        &:disabled {
            background-color: ${theme.palette.tableBorder};
            color: ${theme.palette.secondary.dark};
            border: 1px solid ${theme.palette.tableBorder};

            & svg {
                fill: ${theme.palette.secondary.dark};
            }
        }
    }
`;

export const CancelButton = styled(MuiButton)`
    && {
        ${commonButtonStyles}
        background-color: ${theme.palette.secondary.light};
        color: ${theme.palette.secondary.contrastText};
        border: 1px solid ${theme.palette.tableBorder};

        &:hover {
            background-color: ${theme.palette.tableBorder};
        }

        &:active {
            background-color: ${theme.palette.cancelActive};
        }

        &:disabled {
            background-color: ${theme.palette.tableBorder};
            color: ${theme.palette.secondary.dark};
            border: 1px solid ${theme.palette.tableBorder};
        }
    }
`;

export const TextButton = styled(MuiButton)`
    && {
        ${commonButtonStyles}
        background-color: transparent;
        color: ${theme.palette.secondary.contrastText};

        &:hover {
            background-color: ${theme.palette.primary.light};
        }

        &:active {
            background-color: ${theme.palette.brandHovedfarge};
        }

        &:disabled {
            background-color: ${theme.palette.tableBorder};
            color: ${theme.palette.secondary.dark};
            border: 1px solid ${theme.palette.tableBorder};

            & svg {
                fill: ${theme.palette.secondary.dark};
            }
        }
    }
`;

export const TernaryButton = styled(MuiButton)`
    && {
        ${commonButtonStyles}
        background-color: ${theme.palette.secondary.main};
        color: ${theme.palette.secondary.contrastText};
        border: 1px solid ${theme.palette.secondary.dark};

        &:hover {
            background-color: ${theme.palette.secondary.light};
        }

        &:active {
            background-color: ${theme.palette.tableBorder};
        }

        &:disabled {
            background-color: ${theme.palette.tableBorder};
            color: ${theme.palette.secondary.dark};
            border: 1px solid ${theme.palette.tableBorder};

            & svg {
                fill: ${theme.palette.secondary.dark};
            }
        }
    }
`;
