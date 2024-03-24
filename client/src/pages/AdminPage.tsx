import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Container, Divider, IconButton, Stack, TableContainer, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { UpdateArticleFormData } from '../components/form/formsConfigs/updateArticleFormConfig';
import { ConfirmationModal } from '../components/modals/ConfirmationModal';
import { ServerSidePagination } from '../components/pagination/ServerSidePagination';
import { Accordion } from '../components/surfaces/Accordion';
import ArticleCard from '../components/surfaces/ArticleCard';
import { FilterControls } from '../components/surfaces/FilterControls';
import { ArticleDto, useArticlesService } from '../hooks/useArticlesService';
import { UpdateArticleDrawerForm } from './AdminPage/UpdateArticleDrawerForm';

function AdminPage() {
    const { queryObject, setQueryObject, data, deleteArticle, updateArticle } =
        useArticlesService();

    const [articleForUpdate, setArticleForUpdate] = useState<null | ArticleDto>(null);
    const [idForDelete, setIdForDelete] = useState<null | number>(null);

    const handleUpdate = async (formData: UpdateArticleFormData) => {
        articleForUpdate && (await updateArticle(formData, articleForUpdate.id));
        setArticleForUpdate(null);
    };

    const handleDelete = () => {
        idForDelete &&
            deleteArticle(idForDelete).finally(() => {
                setIdForDelete(null);
            });
    };

    return (
        <>
            {articleForUpdate ? (
                <UpdateArticleDrawerForm
                    article={articleForUpdate}
                    onClose={() => setArticleForUpdate(null)}
                    onSubmit={handleUpdate}
                />
            ) : null}
            <ConfirmationModal
                modalOpen={!!idForDelete}
                onClose={() => setIdForDelete(null)}
                handleSubmit={handleDelete}
                messages={['Confirm you want to delete article']}
            />
            <Accordion>
                <FilterControls queryObject={queryObject} setQueryObject={setQueryObject} />
            </Accordion>
            {data?.articles.length ? (
                <>
                    <TableContainer>
                        <Container maxWidth={'sm'}>
                            {data.articles.map((a, i) => (
                                <React.Fragment key={i}>
                                    <Box onClick={() => setArticleForUpdate(a)}>
                                        <ArticleCard article={a} />
                                    </Box>
                                    <Divider variant='middle' sx={{ m: 3 }}>
                                        <Tooltip title='Delete article'>
                                            <IconButton
                                                onClick={() => setIdForDelete(a.id)}
                                                color='error'
                                            >
                                                <DeleteIcon fontSize={'large'} />
                                            </IconButton>
                                        </Tooltip>
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

export default AdminPage;
