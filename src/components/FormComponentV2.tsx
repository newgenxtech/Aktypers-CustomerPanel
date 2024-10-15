import React from 'react';
import { useForm, SubmitHandler, FieldValues, UseFormRegister, UseFormHandleSubmit, FormState } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SquareCheck, SquareX } from 'lucide-react';
import { cn, readFileAsBase64 } from "@/lib/utils";
import { DatePicker, message, Radio } from 'antd';
import { routes } from '@/routes/routes';
import axios from 'axios';
// import { SquareCheck } from 'lucide-react';

type FieldType = 'text' | 'email' | 'number' | 'password' | 'checkbox' | 'select' | 'textarea' | 'radio' | 'date' | 'upload';

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

interface ReusableFormProps {
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
}


const ReusableForm: React.FC<ReusableFormProps> = ({ fields, onSubmit, buttonComponent, isUpdate, AdditionalButton, CutomRender }) => {

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

    const { register, handleSubmit, formState, setValue, getValues } = useForm({
        resolver: zodResolver(schema),
        defaultValues: Object.fromEntries(
            fields.map((field) => [
                field.name,
                setDefaultValues(field)
            ])
        )
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
            return file;
        } catch (error) {
            console.error(error);
            message.error('Failed to upload file');
            return null;
        }
    };

    const constructImageURL = (field: CustomField) => {
        const value = getValues(field.name);
        if (value) {
            return routes.backend.file.download
        }
    }
    const renderField = (field: CustomField) => {
        switch (field.type) {
            case 'text':
                return (
                    <input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field?.isInputProps?.placeholder}
                        className={cn("p-2", "border", "rounded-md", "text-base", "bg-white", "text-gray-800, shadow-md")}
                    />
                )
            case 'email':
                return (
                    <input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field?.isInputProps?.placeholder}
                        className={cn(`p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md`)}
                    />
                )
            case 'number':
                return (
                    <input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field?.isInputProps?.placeholder}
                        className={cn(`p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md`)}
                    />
                )
            case 'password':
                return (
                    <input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.label}
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                    />
                );
            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        {...register(field.name)}
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                    />
                );
            case 'select':
                return (
                    <select {...register(field.name)}
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                        multiple={
                            field?.isInputProps?.multiple ?? false
                        }
                    >
                        <option value="" selected disabled hidden>{field?.isInputProps?.placeholder}</option>
                        {field.options?.map((option) => (
                            <option key={option} value={option}
                                className='p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md'
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                );
            case 'textarea':
                return (
                    <textarea
                        {...register(field.name)}
                        placeholder={field.label}
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                    />
                );
            case 'radio':
                return (
                    <Radio
                        {...register(field.name)}
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                    />
                );
            case 'date':
                return (
                    <DatePicker
                        {...register(field.name)}
                        placeholder={field?.isInputProps?.placeholder}
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md selection: bg-transparent')}
                    />
                );
            case 'upload':
                return (
                    <>
                        <input
                            type="file"
                            {...register(field.name)}
                            onChange={(e) => handleFileUpload(e.target.files![0], field)
                                .then((file) => {
                                    if (file) {
                                        message.success('File uploaded successfully');
                                        return file;
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                    message.error('Failed to upload file');
                                    return null;
                                })
                            }
                            className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800 shadow-md')}
                        />
                    </>

                );
            default:
                return null;
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
                            {renderField(field)}
                            {formState.errors[field.name] && (
                                <p style={{ color: 'red' }}>{
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
                            type="reset"
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
