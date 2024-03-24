import { DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Button, CancelButton } from '../styled/Button';
import { CustomDialog } from '../styled/Dialog';
import theme from '../../theme/theme';

export function ConfirmationModal({
    messages,
    modalOpen,
    handleSubmit,
    onClose,
    submitButtonText,
    submitButtonDisabled,
}: {
    messages: string[];
    modalOpen: boolean;
    onClose: () => void;
    handleSubmit: () => void;
    submitButtonText?: string;
    submitButtonDisabled?: boolean;
}) {
    return (
        <CustomDialog
            open={modalOpen}
            onClose={onClose}
            sx={{
                '.MuiPaper-root': {
                    minWidth: '430px',
                    maxWidth: '600px !important',
                    textAlign: 'center',
                },
            }}
        >
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                {messages.map((message) => (
                    <Typography
                        key={message}
                        color={theme.palette.secondary.contrastText}
                        align='center'
                        pb={1}
                        fontSize={16}
                    >
                        {message}
                    </Typography>
                ))}
            </DialogContent>
            <DialogActions>
                <CancelButton onClick={onClose}>Cancel</CancelButton>
                <Button
                    onClick={() => {
                        handleSubmit();
                        onClose();
                    }}
                    disabled={submitButtonDisabled}
                >
                    {submitButtonText ?? 'Confirm'}
                </Button>
            </DialogActions>
        </CustomDialog>
    );
}
