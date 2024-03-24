import { AnyObject, ObjectSchema } from 'yup';

export * as yup from 'yup';

export type FormEntity = {
    name: string;
    label: string;
    type: 'input' | 'textarea' | 'date';
};

export type ValidationSchema = ObjectSchema<
    Record<string, any>,
    AnyObject,
    Record<string, any>,
    ''
>;

export type ValidationConfig = {
    props: FormEntity[];
    validationSchema: ValidationSchema;
    initialValues: Record<string, any>;
};
