import { Box, Stack, useTheme } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { AbsoluteSmallLabel } from '../labels/AbsoluteSmallLabel';
import { Button, CancelButton } from '../styled/Button';
import { StyledTextField } from '../styled/StyledTextField';
import { TextareaAutosize } from '../styled/TextareaAutosize';
import { FormEntity, ValidationConfig } from './formsConfigs/formConfigTypes';

export function FormWithValidation({
    config,
    onClose,
    onSubmit,
}: {
    config: ValidationConfig;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (inputs: any) => Promise<void>;
}) {
    const getFieldComponent = (type: FormEntity['type']) => {
        switch (type) {
            case 'textarea':
                return TextareaAutosize;
            default:
                return StyledTextField;
        }
    };

    const checkIfUpdateRequired = (values: Record<string, any>) => {
        return JSON.stringify(values) !== JSON.stringify(config.initialValues);
    };

    return (
        <>
            <Formik
                initialValues={config.initialValues}
                onSubmit={async (values, { resetForm }) => {
                    if (checkIfUpdateRequired(values)) await onSubmit(values);
                    resetForm();
                    onClose();
                }}
                validationSchema={config.validationSchema}
            >
                {({ errors, touched, resetForm }) => (
                    <Form>
                        {config.props.map((p, i) => (
                            <ValidationFieldWrapper
                                key={p.name}
                                name={p.name}
                                label={p.label}
                                error={touched[p.name] && Boolean(errors[p.name])}
                                showLabel={p.type === 'textarea'}
                            >
                                <Field
                                    as={getFieldComponent(p.type)}
                                    error={touched[p.name] && Boolean(errors[p.name])}
                                    label={p.label}
                                    id={p.name}
                                    type={p.type === 'date' ? 'datetime-local' : 'text'}
                                    name={p.name}
                                />
                            </ValidationFieldWrapper>
                        ))}
                        <Stack gap={2} ml={2} direction={'row'} justifyContent={'left'}>
                            <CancelButton
                                onClick={() => {
                                    resetForm();
                                    onClose();
                                }}
                                variant='outlined'
                            >
                                Cancel
                            </CancelButton>
                            <Button type='submit'>Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
}

function ValidationFieldWrapper({
    error,
    children,
    name,
    showLabel,
    label,
}: {
    error?: boolean;
    children: React.ReactNode;
    name: string;
    showLabel: boolean;
    label: string;
}) {
    const { palette } = useTheme();
    return (
        <Box sx={{ ':focus-within': { color: palette.primary.main } }} m={2}>
            {showLabel ? <AbsoluteSmallLabel labelText={label} error={error} /> : null}
            {children}
            <ErrorMessage
                component={(p) => (
                    <Box
                        style={{
                            position: 'absolute',
                            transform: 'translate(12px,-6px)',
                        }}
                        {...p}
                        color={palette.error.main}
                    />
                )}
                name={name}
            />
        </Box>
    );
}
