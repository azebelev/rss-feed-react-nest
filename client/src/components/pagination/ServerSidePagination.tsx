import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    SelectChangeEvent,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { DefaultValueConstants } from '../../constants/DefaultValueConstants';
import { useDebounce } from '../../utils/debounce';
import { OutlinedInput } from '../styled/OutlinedInput';
import { Select } from '../styled/Select';

export type IPaginationReady = {
    page: number;
    pageSize: number;
};

export function ServerSidePagination({
    pagination,
    setPage,
    setPageSize,
    total,
}: {
    pagination: IPaginationReady;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    total: number;
}) {
    const totalPages = Math.ceil(total / pagination.pageSize);
    const canNextPage = pagination.page + 1 <= totalPages;
    const canPreviousPage = pagination.page - 1 > 0;

    const debouncedSetPage = useDebounce(setPage, 1000);
    const onGoToChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const page = +e.target.value;
        if (page > 0 && page <= totalPages) {
            debouncedSetPage(page);
        } else e.target.value = e.target.value.slice(0, e.target.value.length - 1);
    };

    const handlePageSizeChange = (e: SelectChangeEvent<unknown>) => {
        setPageSize(+(e.target.value as string | number));
        setPage(1);
    };

    const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    return (
        <Stack sx={{ flexShrink: 0, m: '10px 0' }} direction={'row'} justifyContent={'center'}>
            <Pagination
                page={pagination.page}
                count={totalPages}
                onChange={(e, page) => setPage(page)}
                hideNextButton={!canNextPage}
                hidePrevButton={!canPreviousPage}
                shape='rounded'
                variant='outlined'
                showFirstButton={isMdUp}
                showLastButton={isMdUp}
                color={'primary'}
                sx={{ '& button': { color: 'secondary.contrastText' } }}
            />
            <Box>
                <FormControl fullWidth>
                    <InputLabel id='label-per-page'>per page</InputLabel>
                    <Select
                        sx={{ height: 32, width: 90 }}
                        labelId='label-per-page'
                        id='per-page'
                        value={pagination.pageSize}
                        label='per page'
                        onChange={handlePageSizeChange}
                    >
                        {DefaultValueConstants.pageSizeOptions.map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {isMdUp && (
                <>
                    <Typography fontSize={'16px'} variant='body2' mx={1} mt={0.5}>
                        go to
                    </Typography>
                    <OutlinedInput
                        sx={{ height: 32, width: 80 }}
                        onBlur={(e) => {
                            e.currentTarget.value = '';
                        }}
                        type='number'
                        onChange={onGoToChange}
                        size='small'
                        inputProps={{ min: 1, max: totalPages }}
                    />
                </>
            )}
        </Stack>
    );
}
