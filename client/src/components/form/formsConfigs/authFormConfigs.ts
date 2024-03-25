import * as yup from 'yup';
import { LoginDto, RegisterDto } from '../../../hooks/useAuth';
import { FormEntity, ValidationConfig } from './formConfigTypes';

const validationSchemaLogin = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(3).max(40),
});
const validationSchemaRegister = yup.object().shape({
    name: yup.string().required().min(3).max(40),
    email: yup.string().required().email(),
    password: yup.string().required().min(3).max(40),
});

const propsLogin: FormEntity[] = [
    { name: 'email', label: 'Email', type: 'input' },
    { name: 'password', label: 'Password', type: 'input' },
];
const propsRegister: FormEntity[] = [...propsLogin, { name: 'name', label: 'Name', type: 'input' }];

export const getLoginFormConfig = (): ValidationConfig => {
    const initialValues: LoginDto = {
        email: '',
        password: '',
    };
    return {
        validationSchema: validationSchemaLogin,
        props: propsLogin,
        initialValues,
    };
};

export const getRegisterFormConfig = (): ValidationConfig => {
    const initialValues: RegisterDto = {
        name: '',
        email: '',
        password: '',
    };
    return {
        validationSchema: validationSchemaRegister,
        props: propsRegister,
        initialValues,
    };
};
