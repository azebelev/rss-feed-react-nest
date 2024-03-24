import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { css, styled, TextField } from '@mui/material';
import theme from '../../theme/theme';

const noLabelStyles = css`
    .MuiInputBase-root {
        margin-top: 0;
    }
`;

const noHelperTextStyles = css`
    && {
        margin-bottom: 0;
    }
`;

export const CustomTextField = styled(TextField)`
    && {
        .MuiInputBase-root {
            border-radius: 4px;
            height: 30px;
            margin: 4px 4px;

            fieldset {
                border-color: ${(props) =>
                    props.error ? theme.palette.error.main : theme.palette.secondary.dark};
            }

            input {
                padding: 8px 15px;
                -moz-appearance: textfield;

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            }

            .MuiSelect-select {
                text-align: left;
            }
        }

        .MuiOutlinedInput-root {
            color: ${theme.palette.secondary.contrastText};

            &.Mui-focused fieldset {
                border-color: ${theme.palette.primary.main};
            }
        }

        .MuiInputLabel-root {
            position: absolute;
            top: -14px;
            left: -14px;
            font-size: 12px;
            color: ${theme.palette.secondary.contrastText};
        }

        .MuiFormHelperText-root {
            margin-left: 0;
            font-size: 12px;
        }

        &.no-label {
            ${noLabelStyles};
        }

        .MuiSelect-icon {
            color: ${theme.palette.secondary.dark};
        }
    }

    &.no-helper-text {
        ${noHelperTextStyles};
    }
`;

CustomTextField.defaultProps = {
    InputLabelProps: {
        shrink: false,
    },
    SelectProps: {
        IconComponent: KeyboardArrowDownRoundedIcon,
    },
};
