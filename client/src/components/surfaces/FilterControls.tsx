import { Container, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SortingEnum } from '../../enums/sortingEnum';
import { QueryObject } from '../../hooks/useArticlesService';
import { useDebounce } from '../../utils/debounce';

export function FilterControls({
    queryObject,
    setQueryObject,
}: {
    queryObject: QueryObject;
    setQueryObject: Dispatch<SetStateAction<QueryObject>>;
}) {
    const [localSearch, setLocalSearch] = useState('');
    const handleAlignment = (_: React.MouseEvent<HTMLElement>, sorting: string | null) => {
        if (sorting === null) return;
        if (+sorting === SortingEnum.Asc) {
            setQueryObject((prev) => ({ ...prev, pubDateSorting: SortingEnum.Asc }));
        } else setQueryObject((prev) => ({ ...prev, pubDateSorting: SortingEnum.Desc }));
    };

    const debouncedSetSearch = useDebounce(setQueryObject, 1000);

    useEffect(() => {
        debouncedSetSearch((prev) => ({ ...prev, search: localSearch }));
    }, [localSearch]);
    return (
        <Container maxWidth={'sm'}>
            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                <TextField
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    sx={{ m: 1 }}
                    inputProps={{ style: { padding: '6px 10px' } }}
                    label='search'
                    InputLabelProps={{
                        style: { marginBottom: '10px' },
                    }}
                    size='small'
                />
                <ToggleButtonGroup
                    sx={{ height: '32px' }}
                    value={queryObject.pubDateSorting}
                    exclusive
                    onChange={handleAlignment}
                >
                    <ToggleButton value={SortingEnum.Desc}>DATE DESC</ToggleButton>
                    <ToggleButton value={SortingEnum.Asc}>DATE ASC</ToggleButton>
                </ToggleButtonGroup>
            </Stack>
        </Container>
    );
}
