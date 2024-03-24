import * as yup from 'yup';
import { FormEntity, ValidationConfig } from './formConfigTypes';

const validationSchema = yup.object().shape({
    feedUrl: yup.string().required().url(),
});

const props: FormEntity[] = [{ name: 'feedUrl', label: 'Rss url of new channel', type: 'input' }];

export const getAddChannelFormConfig = (): ValidationConfig => {
    const initialValues = {
        feedUrl: '',
    };
    return {
        validationSchema,
        props,
        initialValues,
    };
};
