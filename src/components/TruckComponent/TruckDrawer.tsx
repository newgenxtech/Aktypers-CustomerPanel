import React from 'react';
import { Drawer } from 'vaul';
import { Expand, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import FormComponentV2, { CustomField } from '@/components/FormComponentV2';
import { z } from 'zod';
import { ITruckData } from '@/pages/Truck/Truck.d';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface TruckDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    CurrentTruck: ITruckData | null;
    handleCreateTruck: (data: ITruckData) => void;
    handleUpdateTruck: (data: ITruckData) => void;
}

const TruckDrawer: React.FC<TruckDrawerProps> = ({
    open,
    setOpen,
    isEdit,
    setIsEdit,
    CurrentTruck,
    handleCreateTruck,
    handleUpdateTruck
}) => {
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

    const formFields = [
        {
            label: 'Customer ID',
            name: 'customerid',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Customer ID'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(20)
            }
        },
        {
            label: 'Registration Number',
            name: 'registration_number',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Registration Number'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(20)
            }
        },
        {
            label: 'Chassis Number',
            name: 'chassis_number',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Chassis Number'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(20)
            }
        },
        {
            label: 'Engine Number',
            name: 'engine_number',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Engine Number'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(20)
            }
        },
        {
            label: 'Make',
            name: 'make',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Make'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(20)
            }
        },
        {
            label: 'Model',
            name: 'model',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Model'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(20)
            }
        },
        {
            label: 'Year of Manufacture',
            name: 'year_of_manufacture',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Year of Manufacture'
            },
            validation: {
                required: true,
                pattern: z.string().min(4).max(4)
            }
        },
        {
            label: 'Wheels',
            name: 'wheels',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Wheels'
            },
            validation: {
                required: true,
                pattern: z.string().min(1).max(2)
            }
        },
        {
            label: 'Tyre Type',
            name: 'tyre_type',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Tyre Type'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(20)
            }
        },
        {
            label: 'Load Capacity',
            name: 'load_capacity',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Load Capacity'
            },
            validation: {
                required: true,
                pattern: z.string().min(1).max(20)
            }
        },
        {
            label: 'Fuel Type',
            name: 'fuel_type',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Fuel Type'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(20)
            }
        },
        {
            label: 'Insurance Number',
            name: 'insurance_number',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Insurance Number'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(20)
            }
        },
        {
            label: 'Insurance Expiry Date',
            name: 'insurance_expiry_date',
            type: 'date',
            isInputProps: {
                placeholder: 'Enter Insurance Expiry Date',
                defaultValue: isEdit ? CurrentTruck?.insurance_expiry_date : ''
            },
            validation: {
                required: true,
                pattern: z.string().refine((val) => {
                    const date = new Date(val);
                    return date >= new Date();
                })
            }
        },
        {
            label: 'Last Service Date',
            name: 'last_service_date',
            type: 'date',
            isInputProps: {
                placeholder: 'Enter Last Service Date',
                defaultValue: isEdit ? CurrentTruck?.last_service_date : ''
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
            label: 'Remarks',
            name: 'remarks',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Remarks'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(120)
            }
        },
        {
            label: 'RC Book',
            name: 'rc_book',
            type: 'upload',
            isInputProps: {
                placeholder: 'Upload RC Book'
            },
            validation: {
                required: false,
                pattern: z.string().nullable()
            }
        },
        {
            label: 'Insurance',
            name: 'insurance',
            type: 'upload',
            isInputProps: {
                placeholder: 'Upload Insurance'
            },
            validation: {
                required: false,
                pattern: z.string().nullable()
            }
        },
        {
            label: 'Picture',
            name: 'pic',
            type: 'upload',
            isInputProps: {
                placeholder: 'Upload Picture'
            },
            validation: {
                required: false,
                pattern: z.string().nullable()
            }
        }
    ]
    const formMethods = useForm<FieldValues>({
        resolver: zodResolver(z.object(createSchemaObject(formFields as CustomField[])).required()),
        defaultValues: Object.fromEntries(
            formFields.map((field) => [
                field.name,
                setDefaultValues(field as CustomField)
            ])
        ),
        values: CurrentTruck as FieldValues
    })
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
                                <Expand className='w-5 cursor-pointer' onClick={() => navigate({ pathname: `/warehouse/1` })} />
                                <X className='cursor-pointer' onClick={() => { setOpen(false); setIsEdit(false); }} />
                            </div>
                            <Drawer.Title className="font-semibold text-xl mb-8 text-zinc-900 text-center">
                                {isEdit ? 'Edit' : 'Add'} Truck Details
                            </Drawer.Title>
                            <Drawer.Description className="text-zinc-600 mb-2">
                                <FormComponentV2
                                    fields={formFields as CustomField[]}
                                    onSubmit={isEdit ?
                                        (handleUpdateTruck as SubmitHandler<FieldValues>) :
                                        (handleCreateTruck as SubmitHandler<FieldValues>)
                                    }
                                    isUpdate={isEdit}
                                    formMethods={formMethods}
                                    initialValues={CurrentTruck}
                                />
                            </Drawer.Description>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default TruckDrawer;