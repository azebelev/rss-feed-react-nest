import { Chip, Container, Divider, Link, Stack, TableContainer } from '@mui/material';
import React from 'react';
import { ServerSidePagination } from '../components/pagination/ServerSidePagination';
import { Accordion } from '../components/surfaces/Accordion';
import ArticleCard from '../components/surfaces/ArticleCard';
import { FilterControls } from '../components/surfaces/FilterControls';
import { useArticlesService } from '../hooks/useArticlesService';

function ArticlesPage() {
    const { queryObject, setQueryObject, data } = useArticlesService();

    return (
        <>
            <Accordion>
                <FilterControls queryObject={queryObject} setQueryObject={setQueryObject} />
            </Accordion>
            {data?.articles.length ? (
                <>
                    <TableContainer>
                        <Container maxWidth={'sm'}>
                            {data.articles.map((a, i) => (
                                <React.Fragment key={i}>
                                    <Link href={a.link} underline={'none'} color={'inherit'}>
                                        <ArticleCard article={a} />
                                    </Link>
                                    <Divider variant='middle' sx={{ m: 3 }}>
                                        <Chip size='small' />
                                    </Divider>
                                </React.Fragment>
                            ))}
                        </Container>
                    </TableContainer>
                    <Stack m={'10px 0'} direction={'row'} justifyContent={'center'}>
                        <ServerSidePagination
                            pagination={queryObject}
                            setPage={(page) => setQueryObject((prev) => ({ ...prev, page }))}
                            setPageSize={(pageSize) =>
                                setQueryObject((prev) => ({ ...prev, pageSize }))
                            }
                            total={data.count}
                        />
                    </Stack>
                </>
            ) : null}
        </>
    );
}

export default ArticlesPage;
