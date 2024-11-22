import React from 'react';
import { useForm, SubmitHandler, FieldValues, UseFormRegister, UseFormHandleSubmit, FormState, Controller, ControllerRenderProps } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideUpload, SquareCheck, SquareX } from 'lucide-react';
import { cn, readFileAsBase64 } from "@/lib/utils";
import { Button, DatePicker, message, Radio, Upload, Image, Select, Input, Checkbox } from 'antd';
import { routes } from '@/routes/routes';
import axios from 'axios';
import dayjs from 'dayjs';
//import dayjs from 'dayjs' // ES 2015
dayjs().format()
// import { SquareCheck } from 'lucide-react';

type FieldType = 'text' | 'email' | 'number' | 'password' | 'checkbox' | 'select' | 'textarea' | 'radio' | 'date' | 'upload' | 'checkboxGroup';

export interface CustomField {
    name: string;
    label: string;
    type: FieldType;
    isInputProps?: {
        placeholder?: string,
        defaultValue?: string,
        defaultChecked?: boolean,
        defaultSelected?: boolean,
        multiple?: boolean,
    };
    options?: string[];  // For select fields
    validation?: {
        required?: boolean;
        pattern?: z.ZodTypeAny;
    }
    className?: string;
}

interface ReusableFormProps<T> {
    fields: CustomField[];
    onSubmit: SubmitHandler<FieldValues>;
    buttonComponent?: React.ReactNode;
    AdditionalButton?: React.ReactNode;
    isUpdate?: boolean;
    CutomRender?: (
        fields: CustomField[],
        renderField: (field: CustomField) => React.ReactNode,
        ReactHookFormProps: {
            register?: UseFormRegister<{
                [k: string]: string | boolean;
            }>
            handleSubmit?: UseFormHandleSubmit<{
                [k: string]: string | boolean;
            }, undefined>
            formState?: FormState<{
                [k: string]: string | boolean;
            }>
        }
    ) => React.ReactNode;
    initialValues?: T
}


const ReusableForm = <T,>({ fields, onSubmit, buttonComponent, isUpdate, AdditionalButton, CutomRender, initialValues }: ReusableFormProps<T>) => {

    const SchemaObject = Object.fromEntries(
        fields.map((field) => [
            field.name,
            field.validation?.pattern ?? z.string()
        ])
    );

    const schema = z.object(
        SchemaObject
    ).required();

    const setDefaultValues = (field: CustomField) => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'password':
            case 'textarea':
                return field?.isInputProps?.defaultValue ?? '';
            case 'checkbox':
                return field?.isInputProps?.defaultChecked ?? false;
            case 'select':
                return field?.isInputProps?.defaultSelected ?? '';
            case 'radio':
                return field?.isInputProps?.defaultSelected ?? '';
            case 'date':
                return field?.isInputProps?.defaultValue ?? '';
            default:
                return '';
        }
    }

    const { register, handleSubmit, formState, setValue, getValues, control } = useForm({
        resolver: zodResolver(schema),
        defaultValues: Object.fromEntries(
            fields.map((field) => [
                field.name,
                setDefaultValues(field)
            ])
        ),
        values: initialValues as FieldValues

    });


    const handleFileUpload = async (file: File, field: CustomField) => {
        try {
            const base64Data = await readFileAsBase64(file);
            const response = await axios.post<{ message: string, file_name: string, location: string }[]>(routes.backend.file.upload + '?route=uploaddriverFile', [{
                filename: file.name,
                data: base64Data
            }]);
            console.log(response.data);
            setValue(field.name, response.data[0].location);
            console.log('getValues', getValues());

            return file;
        } catch (error) {
            console.error(error);
            message.error('Failed to upload file');
            return null;
        }
    };

    // const constructImageURL = (field: CustomField) => {
    //     const value = getValues(field.name);
    //     if (value) {
    //         return routes.backend.file.download
    //     }
    // }


    const renderField = (field: CustomField, controllerField:
        ControllerRenderProps<FieldValues, string>
    ) => {
        if (field.type === 'date') {
            console.log('field', field?.isInputProps?.defaultValue);
            console.log(dayjs(field?.isInputProps?.defaultValue));
        }

        switch (field.type) {
            case 'text':
                return (
                    // <input
                    //     type={field.type}
                    //     {...register(field.name)}
                    //     placeholder={field?.isInputProps?.placeholder}
                    //     className={cn("p-2", "border", "rounded-md", "text-base", "bg-white", "text-gray-800, shadow-md")}
                    // />
                    <Input
                        type={field.type}
                        {...controllerField}
                        placeholder={field?.isInputProps?.placeholder}
                        status={
                            formState.errors[field.name] ? 'error' : undefined
                        }
                    />
                )
            case 'email':
                return (
                    // <input
                    //     type={field.type}
                    //     {...register(field.name)}
                    //     placeholder={field?.isInputProps?.placeholder}
                    //     className={cn(`p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md`)}
                    // />
                    <Input {...controllerField}
                        placeholder={field?.isInputProps?.placeholder}
                        status={
                            formState.errors[field.name] ? 'error' : undefined
                        }
                        type='email'
                    />
                )
            case 'number':
                return (
                    // <input
                    //     type={field.type}
                    //     {...register(field.name)}
                    //     placeholder={field?.isInputProps?.placeholder}
                    //     className={cn(`p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md`)}
                    // />
                    <Input {...controllerField}
                        placeholder={field?.isInputProps?.placeholder}
                        status={
                            formState.errors[field.name] ? 'error' : undefined
                        }
                        type='number'
                    />
                )
            case 'password':
                return (
                    // <input
                    //     type={field.type}
                    //     {...register(field.name)}
                    //     placeholder={field.label}
                    //     className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                    // />
                    <Input {...controllerField}
                        placeholder={field.label}
                        status={
                            formState.errors[field.name] ? 'error' : undefined
                        }
                        type='password'
                    />
                );
            case 'checkbox':
                return (
                    // <input
                    //     type="checkbox"
                    //     {...register(field.name)}
                    //     className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                    // />
                    <Checkbox
                        {...controllerField}
                        defaultChecked={field?.isInputProps?.defaultChecked}
                    />
                );
            case 'select':
                return (
                    // <select {...register(field.name)}
                    //     className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                    //     multiple={
                    //         field?.isInputProps?.multiple ?? false
                    //     }
                    // >
                    //     <option value="" selected disabled hidden>{field?.isInputProps?.placeholder}</option>
                    //     {field.options?.map((option) => (
                    //         <option key={option} value={option}
                    //             className='p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md'
                    //         >
                    //             {option}
                    //         </option>
                    //     ))}
                    // </select>

                    <Select
                        {...controllerField}
                        placeholder={field?.isInputProps?.placeholder}
                        options={field.options?.map((option) => ({
                            value: option,
                            label: option
                        }))}
                        allowClear
                        filterOption={(input, option) =>
                            (option?.label?.toLowerCase().indexOf(input.toLowerCase()) ?? -1) >= 0
                        }
                        getPopupContainer={(trigger) => trigger.parentElement}
                    />
                );
            case 'textarea':
                return (
                    // <textarea
                    //     {...register(field.name)}
                    //     placeholder={field.label}
                    //     className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                    // />
                    <Input.TextArea
                        {...controllerField}
                        placeholder={field.label}
                        status={
                            formState.errors[field.name] ? 'error' : undefined
                        }
                    />
                );
            case 'radio':
                return (
                    <Radio
                        {...controllerField}
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                    />
                );
            case 'checkboxGroup':
                return (
                    <Checkbox.Group
                        {...controllerField}
                        options={field.options?.map((option) => ({
                            label: option,
                            value: option
                        }))}

                        onChange={(value) => {
                            setValue(field.name, value);
                        }}


                    />
                );
            case 'date':
                return (
                    <DatePicker
                        // {...field}
                        // {...controllerField}
                        placeholder={field?.isInputProps?.placeholder}
                        // className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md selection: bg-transparent')}
                        onChange={(_, dateString) => {
                            setValue(field.name, dateString as string);
                        }}
                        defaultValue={getValues(field.name) ? dayjs(getValues(field.name)) : undefined}
                    />


                    //     <DatePicker
                    //     // {...field}
                    //     {...controllerField}
                    //     placeholder={field?.isInputProps?.placeholder}
                    //     // className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md selection: bg-transparent')}
                    //     onChange={(_, dateString) => {
                    //         setValue(field.name, dateString as string);
                    //     }}
                    // // defaultValue={getValues(field.name) ? dayjs(getValues(field.name)) : undefined}
                    // />
                );
            case 'upload':
                return (
                    <>
                        <Upload
                            name={field.name}
                            customRequest={async ({ file, onSuccess, onError }) => {
                                try {
                                    const uploadedFile = await handleFileUpload(file as File, field);
                                    if (uploadedFile) {
                                        if (onSuccess) {
                                            onSuccess("ok");
                                        }
                                        message.success('File uploaded successfully');
                                    } else {
                                        if (onError) {
                                            onError(new Error('Failed to upload file'));
                                        }
                                    }
                                } catch (error) {
                                    console.error(error);
                                    if (onError) {
                                        onError(new Error('Failed to upload file'));
                                    }
                                    message.error('Failed to upload file');
                                }
                            }}
                            showUploadList={true}
                            maxCount={1}
                        >
                            <Button
                                icon={<LucideUpload />}>Click to Upload</Button>
                        </Upload>
                        {
                            getValues(field.name) && (
                                <Image
                                    width={30}
                                    src={`${routes.backend.file.upload}/${getValues(field.name)}`}
                                    alt={'License'}
                                />
                            )
                        }
                    </>

                );
            default:
                return <></>;
        }
    };

    return (
        <form
            // className="flex flex-col gap-4 w-full"
            className={`flex flex-col gap-4`}
            onSubmit={
                (e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)
                }
            }
        >

            {
                CutomRender ?
                    CutomRender!(fields, renderField, { register, handleSubmit, formState }) :
                    fields.map((field) => (
                        <div key={field.name} className="flex flex-col gap-1">
                            <label htmlFor={field.name} className="text-sm" >{field.label}
                                {field?.validation?.required && <span className="text-red-500">*</span>}
                            </label>

                            <Controller
                                name={field.name}
                                control={control}
                                render={({ field: controllerField }) => renderField(field, controllerField)}

                            />

                            {formState.errors[field.name] && (
                                <p
                                    className='text-red-500 text-xs'
                                >{
                                        formState.errors[field.name]?.message?.toString() ?? 'This field is required'
                                    }</p>
                            )}
                        </div>
                    ))
            }
            {
                buttonComponent ? buttonComponent : (
                    <div className='flex gap-4 justify-center'>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            className="bg-[#2F4829] text-white px-2 py-2 rounded-md w-24 flex items-center justify-center gap-2"
                        >
                            <SquareCheck
                                className="h-4 w-4"
                            />
                            {
                                isUpdate ? 'Update' : 'Add'
                            }
                        </button>
                        <button
                            onClick={() => {
                                console.log('Clearing form');
                                //  Check if the Form already cleared

                                if (Object.keys(getValues()).every((key) => getValues()[key] === '')) {
                                    message.info('Form already cleared');
                                    return;
                                }

                                Object.keys(getValues()).forEach((key) => {
                                    setValue(key, '');
                                });

                            }}
                            className="bg-[#A61C1C] text-white px-2 py-2 rounded-md w-24 flex items-center justify-center gap-2"
                        >
                            <SquareX className="h-4 w-4" />
                            Clear
                        </button>
                    </div>
                )
            }
            {
                AdditionalButton && AdditionalButton
            }
        </form>
    );
};

export default ReusableForm;
