import React, { useEffect } from 'react';
import { Drawer } from 'vaul';
import { Expand, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import FormComponentV2, { CustomField } from '@/components/FormComponentV2';
import { z } from 'zod';
import { ITruckConfig, ITruckData } from '@/pages/Truck/Truck.d';
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
    TruckConfigData: ITruckConfig[]
}

const TruckDrawer: React.FC<TruckDrawerProps> = ({
    open,
    setOpen,
    isEdit,
    setIsEdit,
    CurrentTruck,
    handleCreateTruck,
    handleUpdateTruck,
    TruckConfigData
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

    const formFields: CustomField[] = [
        {
            label: 'Registration Number',
            name: 'registration_number',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Registration Number'
            },
            validation: {
                required: true,
                pattern: z.string().refine((val) => {
                    return val.length >= 5 && val.length <= 25;
                }, {
                    message: "Registration Number must be between 5 and 25 characters"
                })
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
                pattern: z.string()
                    .length(17, "Chassis number must be exactly 17 characters")
                    .regex(/^[A-HJ-NPR-Z0-9]{17}$/, "Invalid chassis number format")
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
                pattern: z.string()
                    .min(6, "Engine number must be at least 6 characters")
                    .max(20, "Engine number must not exceed 20 characters")
                    .regex(/^[A-Z0-9]+$/, "Engine number can only contain uppercase letters and numbers")
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
                pattern: z.string()
                    .min(2, "Make must be at least 2 characters")
                    .max(50, "Make must not exceed 50 characters")
                    .regex(/^[a-zA-Z0-9\s-]+$/, "Make can only contain letters, numbers, spaces, and hyphens")
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
                pattern: z.string()
                    .min(2, "Model must be at least 2 characters")
                    .max(50, "Model must not exceed 50 characters")
                    .regex(/^[a-zA-Z0-9\s-]+$/, "Model can only contain letters, numbers, spaces, and hyphens")
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
                pattern: z.string()
                    .length(4, "Year must be 4 digits")
                    .regex(/^(19|20)\d{2}$/, "Year must be between 1900 and current year")
                    .refine(year => {
                        const numYear = parseInt(year);
                        return numYear >= 1900 && numYear <= new Date().getFullYear();
                    }, "Year must be between 1900 and current year")
            }
        },
        {
            label: 'Truck Type',
            name: 'tyre_type',
            type: 'select',
            isInputProps: {
                placeholder: 'Select Tyre Type'
            },
            options: TruckConfigData?.map((config) => {
                return {
                    label: config.total_tyres + " Tyres" + " - [" + config.axle_configuration + "] - " + config.total_axles + " Axles",
                    value: config.truck_id
                }
            }),
            validation: {
                required: true,
                pattern: z.string()
            }
        },
        {
            label: 'Load Capacity',
            name: 'load_capacity',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Load Capacity (in tons)'
            },
            validation: {
                required: true,
                pattern: z.string()
                    .regex(/^\d+(\.\d{1,2})?$/, "Invalid load capacity format (e.g., 10 or 10.50)")
                    .refine(val => parseFloat(val) > 0, "Load capacity must be greater than 0")
            }
        },
        {
            label: 'Fuel Type',
            name: 'fuel_type',
            type: 'select',
            isInputProps: {
                placeholder: 'Select Fuel Type'
            },
            options: [
                { label: 'Diesel', value: 'Diesel' },
                { label: 'Petrol', value: 'Petrol' },
                { label: 'CNG', value: 'CNG' },
                { label: 'Electric', value: 'Electric' }
            ],
            validation: {
                required: true,
                pattern: z.enum(['Diesel', 'Petrol', 'CNG', 'Electric'])
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
                pattern: z.string()
                    .min(8, "Insurance number must be at least 8 characters")
                    .max(30, "Insurance number must not exceed 30 characters")
                    .regex(/^[A-Z0-9-/]+$/, "Insurance number can only contain uppercase letters, numbers, hyphens, and forward slashes")
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
                pattern: z.string().refine(
                    (val) => {
                        const date = new Date(val);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date >= today;
                    },
                    { message: "Insurance expiry date must be today or in the future" }
                )
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
                pattern: z.string().refine(
                    (val) => {
                        const date = new Date(val);
                        const minDate = new Date('1900-01-01');
                        const today = new Date();
                        today.setHours(23, 59, 59, 999);
                        return date >= minDate && date <= today;
                    },
                    { message: "Last service date must be between 01-01-1900 and today" }
                )
            }
        },
        {
            label: 'Remarks',
            name: 'remarks',
            type: 'textarea',
            isInputProps: {
                placeholder: 'Enter Remarks'
            },
            validation: {
                required: true,
                pattern: z.string()
                    .min(3, "Remarks must be at least 3 characters")
                    .max(120, "Remarks must not exceed 120 characters")
                    .regex(/^[a-zA-Z0-9\s.,!?()-]+$/, "Remarks can only contain letters, numbers, and basic punctuation")
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

    useEffect(() => {
        if (!isEdit) {
            // set CustomerId 
            formMethods.setValue('customerid', localStorage.getItem('customer_id') || '');
        }
    }, [CurrentTruck, formMethods, isEdit, open]);
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