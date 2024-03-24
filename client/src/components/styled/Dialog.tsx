import { Dialog, styled } from '@mui/material';

export const CustomDialog = styled(Dialog)`
    && {
        & .MuiPaper-root {
            max-width: 390px;
            padding: 22px 16px;

            .MuiDialogTitle-root {
                text-align: center;
                padding: 0 10px 10px 0;
                margin-bottom: 14px;
                font-size: 18px;
                font-weight: 600;
                line-height: normal;
            }

            .MuiDialogContent-root {
                padding: 0;
                text-align: center;
            }

            .MuiDialogActions-root {
                justify-content: center;
                padding: 28px 0 0 0;
                gap: 10px;
            }

            .MuiDialogActions-root > :not(:first-of-type) {
                margin: 0;
            }
        }
    }
`;
