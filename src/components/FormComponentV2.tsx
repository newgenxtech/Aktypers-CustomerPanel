import React from 'react';
import { SubmitHandler, FieldValues, Controller, ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { LucideUpload, SquareCheck, SquareX } from 'lucide-react';
import { cn, readFileAsBase64 } from "@/lib/utils";
import { Button, DatePicker, message, Radio, Upload, Select, Input, Checkbox } from 'antd';
import { routes } from '@/routes/routes';
import axios from 'axios';
import dayjs from 'dayjs';
dayjs().format()

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
        disabled?: boolean,
    };
    options?: {
        label: string | number | boolean;
        value: string | number | boolean;
    }[];
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
    formMethods: UseFormReturn<FieldValues>;
    initialValues?: T;
}


const ReusableForm = <T,>({ fields, onSubmit, buttonComponent, isUpdate, AdditionalButton, formMethods }: ReusableFormProps<T>) => {


    const handleFileUpload = async (file: File, field: CustomField) => {
        try {
            const base64Data = await readFileAsBase64(file);
            const response = await axios.post<{ message: string, file_name: string, location: string }[]>(
                routes.backend.file.upload + '?route=uploaddriverFile',
                [{
                    filename: file.name,
                    data: base64Data
                }]
            );
            formMethods.setValue(field.name, response.data[0].location);
            return file;
        } catch (error) {
            console.error(error);
            message.error('Failed to upload file');
            return null;
        }
    };

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
                    <Input
                        type={field.type}
                        {...controllerField}
                        placeholder={field?.isInputProps?.placeholder}
                        status={
                            formMethods.formState.errors[field.name] ? 'error' : undefined
                        }
                        disabled={field?.isInputProps?.disabled}
                    />
                )
            case 'email':
                return (
                    <Input {...controllerField}
                        placeholder={field?.isInputProps?.placeholder}
                        status={
                            formMethods.formState.errors[field.name] ? 'error' : undefined
                        }
                        type='email'
                        disabled={field?.isInputProps?.disabled}
                    />
                )
            case 'number':
                return (
                    <Input {...controllerField}
                        placeholder={field?.isInputProps?.placeholder}
                        status={
                            formMethods.formState.errors[field.name] ? 'error' : undefined
                        }
                        type='number'
                        disabled={field?.isInputProps?.disabled}
                    />
                )
            case 'password':
                return (
                    <Input {...controllerField}
                        placeholder={field.label}
                        status={
                            formMethods.formState.errors[field.name] ? 'error' : undefined
                        }
                        type='password'
                        disabled={field?.isInputProps?.disabled}
                    />
                );
            case 'checkbox':
                return (
                    <Checkbox
                        {...controllerField}
                        defaultChecked={field?.isInputProps?.defaultChecked}
                        disabled={field?.isInputProps?.disabled}
                    />
                );
            case 'select':
                return (
                    <Select
                        {...controllerField}
                        placeholder={field?.isInputProps?.placeholder}
                        options={field.options?.map((option) => ({
                            label: option.label,
                            value: option.value
                        }))}
                        allowClear
                        filterOption={
                            (input, option) =>
                                (option?.label?.toString()?.toLowerCase()?.indexOf(input.toLowerCase()) ?? -1) >= 0
                        }
                        getPopupContainer={(trigger) => trigger.parentElement}
                        disabled={field?.isInputProps?.disabled}
                    />
                );
            case 'textarea':
                return (
                    <Input.TextArea
                        {...controllerField}
                        placeholder={field.label}
                        status={
                            formMethods.formState.errors[field.name] ? 'error' : undefined
                        }
                        disabled={field?.isInputProps?.disabled}
                    />
                );
            case 'radio':
                return (
                    <Radio
                        {...controllerField}
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                        disabled={field?.isInputProps?.disabled}
                    />
                );
            case 'date':
                return (
                    <DatePicker
                        {...controllerField}
                        placeholder={field?.isInputProps?.placeholder}
                        onChange={(date) => {
                            if (date) {
                                formMethods.setValue(field.name, date.format('YYYY-MM-DD'));
                            } else {
                                formMethods.setValue(field.name, null);
                            }
                        }}
                        value={formMethods.getValues(field.name) ? dayjs(formMethods.getValues(field.name)) : null}
                        disabled={field?.isInputProps?.disabled}
                        allowClear
                        format="DD/MM/YYYY"
                        status={
                            formMethods.formState.errors[field.name] ? 'error' : undefined
                        }
                    />
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
                        {formMethods.getValues(field.name) && (
                            <div className="image-preview">
                                <img
                                    width={100}
                                    src={`${routes.backend.file.download}/${formMethods.getValues(field.name)}`}
                                    alt={field.label}
                                    className='cursor-pointer'
                                    onClick={
                                        () => {
                                            window.open(`${routes.backend.file.download}/${formMethods.getValues(field.name)}`, "_blank");
                                        }
                                    }
                                />
                            </div>
                        )}
                    </>

                );
            default:
                return <></>;
        }
    };

    return (
        <form
            className={`flex flex-col gap-4`}
            onSubmit={
                (e) => {
                    e.preventDefault();
                    formMethods.handleSubmit(onSubmit)
                }
            }
        >

            {
                fields.map((field) => (
                    <div key={field.name} className="flex flex-col gap-1">
                        <label htmlFor={field.name} className="text-sm" >{field.label}
                            {field?.validation?.required && <span className="text-red-500">*</span>}
                        </label>

                        <Controller
                            name={field.name}
                            control={formMethods.control}
                            render={({ field: controllerField }) => renderField(field, controllerField)}

                        />

                        {formMethods.formState.errors[field.name] && (
                            <p
                                className='text-red-500 text-xs'
                            >{
                                    formMethods.formState.errors[field.name]?.message?.toString() ?? 'This field is required'
                                }</p>
                        )}
                    </div>
                ))
            }
            {
                buttonComponent ? buttonComponent : (
                    <div className='flex gap-4 justify-center'>
                        <button
                            onClick={formMethods.handleSubmit(onSubmit)}
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
                                if (Object.keys(formMethods.getValues()).every((key) => formMethods.getValues()[key] === '')) {
                                    message.info('Form already cleared');
                                    return;
                                }

                                Object.keys(formMethods.getValues()).forEach((key) => {
                                    formMethods.setValue(key, '');
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
