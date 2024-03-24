import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    DialogContent,
    DialogTitle,
    MenuItem,
    SelectChangeEvent,
    Stack,
    Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useChannelsService } from '../../hooks/useChannelsService';
import useChannelsStore from '../../store/channelsStore';
import { FormWithValidation } from '../form/FormWithValidation';
import { getAddChannelFormConfig } from '../form/formsConfigs/addNewChannelConfig';
import { ConfirmationModal } from '../modals/ConfirmationModal';
import { CustomDialog } from '../styled/Dialog';
import { Select } from '../styled/Select';

export function ChannelControl() {
    const { channels, deleteChannel, addChannel } = useChannelsService();
    const { activeChannel, setActiveChannel } = useChannelsStore(
        ({ activeChannel, setActiveChannel }) => ({ activeChannel, setActiveChannel }),
    );
    const [newChannelModalOpen, setNewChannelModalOpen] = useState(false);
    const [idForDelete, setIdForDelete] = useState<null | number>(null);
    const [selectIsOpen, setSelectIsOpen] = useState(false);

    const location = useLocation();

    const handleChange = (e: SelectChangeEvent<any>) => {
        const activeChannel = channels?.filter((c) => c.id === e.target.value)?.[0];
        activeChannel && setActiveChannel(activeChannel);
    };

    const handleDelete = async () => {
        idForDelete && (await deleteChannel(idForDelete));
        setIdForDelete(null);
    };

    const formConfig = getAddChannelFormConfig();

    const isAdmin = location.pathname === '/admin';
    return (
        <Box>
            <CustomDialog
                open={newChannelModalOpen}
                onClose={() => setNewChannelModalOpen(false)}
                sx={{ textAlign: 'center' }}
            >
                <DialogTitle>Insert url off new channel for rss feed</DialogTitle>
                <DialogContent>
                    <FormWithValidation
                        onSubmit={addChannel}
                        onClose={() => setNewChannelModalOpen(false)}
                        config={formConfig}
                    />
                </DialogContent>
            </CustomDialog>
            <ConfirmationModal
                modalOpen={!!idForDelete}
                onClose={() => setIdForDelete(null)}
                handleSubmit={handleDelete}
                messages={['Confirm you want to delete chanel']}
            />
            <Select
                sx={{
                    ml: '22px',
                    width: '250px',
                    height: '32px',
                    '.MuiSelect-icon': {
                        fontSize: '18px',
                    },
                }}
                value={activeChannel?.id ?? ''}
                onChange={handleChange}
                onOpen={() => setSelectIsOpen(true)}
                onClose={() => setSelectIsOpen(false)}
            >
                {channels?.length
                    ? channels.map((c, i) => (
                          <MenuItem key={i} value={c.id}>
                              <Stack direction={'row'} justifyContent={'space-between'} gap={0.5}>
                                  {isAdmin && selectIsOpen ? (
                                      <Tooltip title='Delete article'>
                                          <DeleteIcon
                                              sx={{ mr: 3, cursor: 'pointer' }}
                                              onClick={() => setIdForDelete(c.id)}
                                              color='error'
                                              fontSize={'small'}
                                          />
                                      </Tooltip>
                                  ) : null}
                                  {c.title}
                              </Stack>
                          </MenuItem>
                      ))
                    : null}
                {isAdmin ? (
                    <MenuItem>
                        <Stack direction={'row'} gap={0.5}>
                            <Button
                                onClick={() => setNewChannelModalOpen(true)}
                                size={'small'}
                                variant='outlined'
                            >
                                Add New Channel
                            </Button>
                        </Stack>
                    </MenuItem>
                ) : null}
            </Select>
        </Box>
    );
}
