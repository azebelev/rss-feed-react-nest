import dayjs from 'dayjs';
import * as yup from 'yup';
import { ArticleDto, UpdateArticleDto } from '../../../hooks/useArticlesService';
import { FormEntity, ValidationConfig } from './formConfigTypes';

export type UpdateArticleFormData = Omit<UpdateArticleDto, 'pubDate'> & {
    pubDate: string;
};

const validationSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required().max(250),
    link: yup.string().required().url(),
    creator: yup.string().optional(),
    pubDate: yup
        .string()
        .required()
        .test('is-date', 'Invalid date format', (value) => {
            return !isNaN(Date.parse(value));
        }),
    mediaLink: yup.string().optional().url(),
    mediaType: yup.string().optional(),
    mediaCredit: yup.string().nullable(),
});

const props: FormEntity[] = [
    { name: 'title', label: 'Title', type: 'input' },
    { name: 'content', label: 'Content', type: 'textarea' },
    { name: 'link', label: 'Link to full version', type: 'input' },
    { name: 'creator', label: 'Author', type: 'input' },
    { name: 'pubDate', label: 'Date ', type: 'date' },
    { name: 'mediaUrl', label: 'Link of media', type: 'input' },
    { name: 'mediaType', label: 'Type of media', type: 'input' },
    { name: 'mediaCredit', label: 'Description of media', type: 'input' },
];

export const getUpdateArticleFormConfig = (article: ArticleDto): ValidationConfig => {
    const initialValues: UpdateArticleFormData = {
        title: article.title,
        content: article.content,
        link: article.link,
        creator: article.creator,
        pubDate: dayjs(article.pubDate).format('YYYY-MM-DDTHH:MM'),
        mediaUrl: article.mediaUrl ?? '',
        mediaType: article.mediaType ?? '',
        mediaCredit: article.mediaCredit ?? '',
    };
    return {
        validationSchema,
        props,
        initialValues,
    };
};
