import { Stack } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import {
    getUpdateArticleFormConfig,
    UpdateArticleFormData,
} from '../../components/form/formsConfigs/updateArticleFormConfig';
import { FormWithValidation } from '../../components/form/FormWithValidation';
import { ArticleDto } from '../../hooks/useArticlesService';

export function UpdateArticleDrawerForm({
    article,
    onClose,
    onSubmit,
}: {
    article: ArticleDto;
    onClose: () => void;
    onSubmit: (formData: UpdateArticleFormData) => Promise<void>;
}) {
    return article ? (
        <Drawer anchor='left' open={true} onClose={onClose}>
            <Stack sx={{ width: { xs: '100vw', sm: '50vw', md: '40vw', lg: '30vw' } }} gap={4}>
                <FormWithValidation
                    onSubmit={onSubmit}
                    onClose={() => onClose()}
                    config={getUpdateArticleFormConfig(article)}
                />
            </Stack>
        </Drawer>
    ) : null;
}
