import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { t } from 'i18next';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import Field from '@/components/ui/form/Field';
import Form from '@/components/ui/form/Form';
import Input from '@/components/ui/form/Input';
import Switch from '@/components/ui/form/Switch';
import VTLEditor from '@/components/ui/form/VTLEditor';
import { type Variable } from '@/models/variables';

import { type FormValues, schema } from './schema';
import Select from '@/components/ui/form/Select';
import { LoopType } from '@/models/loop';

type Props = {
    questionnaireId: string;
    /** Function that will be called with form data when the user submit the form. */
    onSubmit: SubmitHandler<FormValues>;
    /** Label to display on the submit button */
    submitLabel: string;
    /** Available scopes with the mapping between id and name. */
    scopes: Map<string, string>;
    /** Members available for initial and final selections. */
    members: LoopMemberOption[];
    /** List of variables used for auto-completion in VTL editor. */
    variables?: Variable[];
};

// to move away
export type LoopMemberOption = {
    id: string;
    name: string;
};

/**
 * Create or edit a loop.
 */
export default function LoopForm({
    questionnaireId,
    onSubmit,
    submitLabel,
    scopes,
    members,
    variables = [],
}: Readonly<Props>) {
    const navigate = useNavigate();

    const loop = {
        name: '',
        type: LoopType.FixedLength,
        isBasedOn: false,
        isFixedLength: true,
        size: '',
        initialMemberReference: '',
        finalMemberReference: '',
        loopSinglePage: false,
    }

    const {
        control,
        handleSubmit,
        formState: { isDirty, isSubmitted, isValid },
        setError,
        watch,
    } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: loop,
        resolver: zodResolver(schema),
    });

    const isBasedOn = watch('isBasedOn')
    const isFixedLength = watch('isFixedLength');

    const scopeOptions = Array.from(scopes).map(([id, name]) => ({
        label: name,
        value: id,
    }));
    const memberOptions = members.map(({ id, name }) => ({
        label: name,
        value: id,
    }));

    const handleCancel = () => {
        navigate({
            to: '/questionnaire/$questionnaireId',
            params: { questionnaireId },
            ignoreBlocker: true,
        });
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            onCancel={handleCancel}
            isDirty={isDirty}
            isValid={isValid}
            isSubmitted={isSubmitted}
            validateLabel={submitLabel}
        >
            <Controller
                name="name"
                control={control}
                render={({
                    field: { name, value, onChange },
                    fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                    <Field
                        dirty={isDirty}
                        error={error}
                        invalid={invalid}
                        label={t('loop.name')}
                        name={name}
                        required
                        touched={isTouched}
                    >
                        <Input value={value} onValueChange={onChange} />
                    </Field>
                )}
            />

            <Controller
                name="isBasedOn"
                control={control}
                render={({
                    field: { ref, name, value, onBlur, onChange },
                    fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                    <Field
                        dirty={isDirty}
                        error={error}
                        invalid={invalid}
                        label={t('loop.isBasedOn')}
                        name={name}
                        required
                        touched={isTouched}
                    >
                        <Switch
                            checked={value}
                            inputRef={ref}
                            onBlur={onBlur}
                            onCheckedChange={onChange}
                        />
                    </Field>
                )}
            />

            {isBasedOn ? (<>
                <Controller
                    name="iterableReference"
                    control={control}
                    render={({
                        field: { name, value, onChange },
                        fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                        <Field
                            dirty={isDirty}
                            error={error}
                            invalid={invalid}
                            label={t('loop.iterableReference')}
                            name={name}
                            required
                            touched={isTouched}
                        >
                            <Select<string>
                                options={scopeOptions}
                                value={value}
                                onChange={onChange}
                            />
                        </Field>
                    )}
                />
                <Controller
                    name="filter"
                    control={control}
                    render={({
                        field: { name, value, onChange },
                        fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                        <VTLEditor
                            dirty={isDirty}
                            error={error}
                            invalid={invalid}
                            label={t('loop.filter')}
                            name={name}
                            onChange={onChange}
                            setError={(error) => setError(name, error)}
                            suggestionsVariables={variables}
                            touched={isTouched}
                            value={value}
                        />
                    )}
                /></>
            ) : null}
            {!isBasedOn ?
                (<>
                    <Controller
                        name="isFixedLength"
                        control={control}
                        render={({
                            field: { ref, name, value, onBlur, onChange },
                            fieldState: { invalid, isTouched, isDirty, error },
                        }) => (
                            <Field
                                dirty={isDirty}
                                error={error}
                                invalid={invalid}
                                label={t('loop.isFixedLength')}
                                name={name}
                                required
                                touched={isTouched}
                            >
                                <Switch
                                    checked={value}
                                    inputRef={ref}
                                    onBlur={onBlur}
                                    onCheckedChange={onChange}
                                />
                            </Field>
                        )}
                    />
                    {isFixedLength && (
                        <>
                            <Controller
                                name="size"
                                control={control}
                                render={({
                                    field: { name, value, onChange },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                }) => (
                                    <VTLEditor
                                        dirty={isDirty}
                                        error={error}
                                        invalid={invalid}
                                        label={t('loop.size')}
                                        name={name}
                                        onChange={onChange}
                                        required
                                        setError={(error) => setError(name, error)}
                                        suggestionsVariables={variables}
                                        touched={isTouched}
                                        value={value}
                                    />
                                )}
                            />
                            <Controller
                                name="loopSinglePage"
                                control={control}
                                render={({
                                    field: { ref, name, value, onBlur, onChange },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                }) => (
                                    <Field
                                        dirty={isDirty}
                                        error={error}
                                        invalid={invalid}
                                        label={t('loop.loopSinglePage')}
                                        name={name}
                                        touched={isTouched}
                                    >
                                        <Switch
                                            checked={value}
                                            inputRef={ref}
                                            onBlur={onBlur}
                                            onCheckedChange={onChange}
                                        />
                                    </Field>
                                )}
                            />
                        </>
                    )}
                    {!isBasedOn ? (
                        <>
                            <Controller
                                name="minimum"
                                control={control}
                                render={({
                                    field: { name, value, onChange },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                }) => (
                                    <VTLEditor
                                        dirty={isDirty}
                                        error={error}
                                        invalid={invalid}
                                        label={t('loop.minimum')}
                                        name={name}
                                        onChange={onChange}
                                        required
                                        setError={(error) => setError(name, error)}
                                        suggestionsVariables={variables}
                                        touched={isTouched}
                                        value={value}
                                    />
                                )}
                            />
                            <Controller
                                name="maximum"
                                control={control}
                                render={({
                                    field: { name, value, onChange },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                }) => (
                                    <VTLEditor
                                        dirty={isDirty}
                                        error={error}
                                        invalid={invalid}
                                        label={t('loop.maximum')}
                                        name={name}
                                        onChange={onChange}
                                        required
                                        setError={(error) => setError(name, error)}
                                        suggestionsVariables={variables}
                                        touched={isTouched}
                                        value={value}
                                    />
                                )}
                            />
                            <Controller
                                name="addButtonLabel"
                                control={control}
                                render={({
                                    field: { name, value, onChange },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                }) => (
                                    <Field
                                        dirty={isDirty}
                                        error={error}
                                        invalid={invalid}
                                        label={t('loop.addButtonLabel')}
                                        name={name}
                                        touched={isTouched}
                                    >
                                        <Input value={value} onValueChange={onChange} />
                                    </Field>
                                )}
                            />
                        </>
                    ) : null}
                </>) : null}
            <Controller
                name="initialMemberReference"
                control={control}
                render={({
                    field: { name, value, onChange },
                    fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                    <Field
                        dirty={isDirty}
                        error={error}
                        invalid={invalid}
                        label={t('loop.initialMember')}
                        name={name}
                        required
                        touched={isTouched}
                    >
                        <Select<string>
                            options={memberOptions}
                            value={value}
                            onChange={onChange}
                        />
                    </Field>
                )}
            />
            <Controller
                name="finalMemberReference"
                control={control}
                render={({
                    field: { name, value, onChange },
                    fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                    <Field
                        dirty={isDirty}
                        error={error}
                        invalid={invalid}
                        label={t('loop.finalMember')}
                        name={name}
                        required
                        touched={isTouched}
                    >
                        <Select<string>
                            options={memberOptions}
                            value={value}
                            onChange={onChange}
                        />
                    </Field>
                )}
            />
        </Form>
    );
}
