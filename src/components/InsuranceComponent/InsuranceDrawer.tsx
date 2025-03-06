import React from 'react';
import { Drawer } from 'vaul';
import { Expand, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import FormComponentV2, { CustomField } from '@/components/FormComponentV2';
import { z } from 'zod';
import { InsuranceMaster } from '@/pages/Insurance/Insurance.d';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ITruckData } from '@/pages/Truck/Truck.d';

interface InsuranceDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    CurrentInsurance: InsuranceMaster | null;
    handleCreateInsurance: (data: InsuranceMaster) => void;
    handleUpdateInsurance: (data: InsuranceMaster) => void;
    TruckListData: ITruckData[];
}

const InsuranceDrawer: React.FC<InsuranceDrawerProps> = ({
    open,
    setOpen,
    isEdit,
    setIsEdit,
    CurrentInsurance,
    handleCreateInsurance,
    handleUpdateInsurance,
    TruckListData
}) => {
    console.log(TruckListData);

    const navigate = useNavigate();

    const createSchemaObject = (fields: CustomField[]) =>
        Object.fromEntries(
            fields.map((field) => [
                field.name,
                field.validation?.pattern ?? z.string()
            ])
        );

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
    };

    const formFields: CustomField[] = [
        {
            label: 'Customer ID',
            name: 'customer_id',
            type: 'text' as const,
            isInputProps: {
                disabled: true,
                defaultValue: localStorage.getItem('customer_id') || '',
                placeholder: 'Enter Customer ID'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(20)
            }
        },
        {
            label: 'Vehicle ID',
            name: 'vehicle_id',
            type: 'select',
            isInputProps: {
                placeholder: 'Select Vehicle ID',
                defaultValue: isEdit ? CurrentInsurance?.vehicle_id : undefined
            },
            validation: {
                required: true,
                pattern: z.string().min(1).max(20)
            },
            options: TruckListData?.map((truck: ITruckData) => {
                return {
                    label: truck?.registration_number,
                    value: truck?.id,
                }
            })
        },
        {
            label: 'Insurance Number',
            name: 'insurance_number',
            type: 'text' as const,
            isInputProps: {
                placeholder: 'Enter Insurance Number'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(20)
            }
        },
        {
            label: 'Insurance Name',
            name: 'insurance_name',
            type: 'text' as const,
            isInputProps: {
                placeholder: 'Enter Insurance Name'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(50)
            }
        },
        {
            label: 'Purchase Date',
            name: 'purchase_date',
            type: 'date' as const,
            isInputProps: {
                placeholder: 'Select Purchase Date',
                defaultValue: isEdit ? CurrentInsurance?.purchase_date : ''
            },
            validation: {
                required: true,
                pattern: z.string().refine((val) => {
                    const date = new Date(val);
                    return date >= new Date('1900-01-01') && date <= new Date();
                }, {
                    message: "Date must be between 01-01-1900 and today"
                })
            }
        },
        {
            label: 'Expiry Date',
            name: 'expiry_date',
            type: 'date' as const,
            isInputProps: {
                placeholder: 'Select Expiry Date',
                defaultValue: isEdit ? CurrentInsurance?.expiry_date : ''
            },
            validation: {
                required: true,
                pattern: z.string().refine((val) => new Date(val) >= new Date(), {
                    message: "Expiry date must be in the future"
                })
            }
        },
        {
            label: 'Insurance Document',
            name: 'filename',
            type: 'upload' as const,
            isInputProps: {
                placeholder: 'Upload Insurance Document'
            },
            validation: {
                required: false,
                pattern: z.string().nullable()
            }
        }
    ];

    const formMethods = useForm<FieldValues>({
        resolver: zodResolver(z.object(createSchemaObject(formFields as CustomField[])).required()),
        defaultValues: Object.fromEntries(
            formFields.map((field) => [
                field.name,
                setDefaultValues(field as CustomField)
            ])
        ),
        values: CurrentInsurance as FieldValues
    });

    return (
        <Drawer.Root direction="right" open={open} onOpenChange={setOpen} dismissible={false}>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content
                    className="right-2 top-2 bottom-2 fixed z-10 outline-none flex lg:w-96 md:w-80 w-72"
                    style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
                >
                    <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col justify-between items-center rounded-[16px] overflow-y-auto">
                        <div className="w-full">
                            <div className="flex justify-between">
                                <Expand className='w-5 cursor-pointer' onClick={() => navigate({ pathname: `/insurance/1` })} />
                                <X className='cursor-pointer' onClick={() => { setOpen(false); setIsEdit(false); }} />
                            </div>
                            <Drawer.Title className="font-semibold text-xl mb-8 text-zinc-900 text-center">
                                {isEdit ? 'Edit' : 'Add'} Insurance Details
                            </Drawer.Title>
                            <Drawer.Description className="text-zinc-600 mb-2">
                                <FormComponentV2
                                    fields={formFields as CustomField[]}
                                    onSubmit={isEdit ?
                                        (handleUpdateInsurance as SubmitHandler<FieldValues>) :
                                        (handleCreateInsurance as SubmitHandler<FieldValues>)
                                    }
                                    isUpdate={isEdit}
                                    formMethods={formMethods}
                                    initialValues={CurrentInsurance}
                                />
                            </Drawer.Description>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default InsuranceDrawer; 