import { CustomField } from '@/components/FormComponentV2';
import { TyresMaster } from '@/pages/Tyres/Tyres';
import { z } from 'zod';


const TyresFormFields = (
    Position: string[],
    isEdit: boolean,
    CurrentTyres: TyresMaster | null
): CustomField[] => [
        {
            label: 'Wheeler Type',
            name: 'Wheeler_Type',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Wheeler Type'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            }
        },
        {
            label: 'Manufacturer',
            name: 'Manufacturer',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Manufacturer'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            }
        },
        {
            label: 'Brand',
            name: 'Brand',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Brand'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            }
        },
        {
            label: 'Tyre Serial Number',
            name: 'Tyre_Serial_Number',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Tyre Serial Number'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            }
        },
        {
            label: 'Fitment KM',
            name: 'Fitment_KM',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Fitment KM'
            },
            validation: {
                required: true,
                pattern: z.string().min(1).max(10)
            }
        },
        {
            label: 'Removal KM',
            name: 'Removal_KM',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Removal KM'
            },
            validation: {
                required: true,
                pattern: z.string().min(1).max(10)
            }
        },
        // {
        //     label: 'Total Covered KM',
        //     name: 'Total_Covered_KM',
        //     type: 'text',
        //     isInputProps: {
        //         placeholder: 'Enter Total Covered KM'
        //     },
        //     validation: {
        //         required: true,
        //         pattern: z.string().min(1).max(10)
        //     }
        // },
        {
            label: 'Retread Yes No',
            name: 'Retread_Yes_No',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Retread Yes No'
            },
            validation: {
                required: true,
                pattern: z.string().min(2).max(3)
            }
        },
        {
            label: 'Tyre Condition',
            name: 'Tyre_Condition',
            type: 'select',
            isInputProps: {
                placeholder: 'Enter Tyre Condition'
            },
            validation: {
                required: true,
                pattern: z.string().refine((val) => ['New', 'Re-Used', 'Old'].includes(val), {
                    message: "Invalid Tyre Condition"
                })
            },
            options: ['New', 'Re-Used', 'Old']
        },
        {
            label: 'Reason for Removal Month',
            name: 'Reason_for_Removal_MONTH',
            type: 'text',
            isInputProps: {
                placeholder: 'Enter Reason for Removal Month'
            },
            validation: {
                required: true,
                pattern: z.string().min(3).max(30)
            }
        },
        {
            label: 'Date',
            name: 'Date',
            type: 'date',
            isInputProps: {
                placeholder: 'Enter Date',
                defaultValue: isEdit ? CurrentTyres?.Date : ''
            },
            validation: {
                required: true,
                pattern: z.string().refine((val) => {
                    const date = new Date(val);
                    return date <= new Date();
                }, {
                    message: "Date must be today or earlier"
                })
            }
        },
        {
            label: 'Position',
            name: 'position',
            type: 'select',
            isInputProps: {
                placeholder: 'Enter Position'
            },
            validation: {
                required: true,
                pattern: z.string().refine((val) => Position.includes(val), {
                    message: "Invalid Position"
                })
            },
            options: Position ?? []
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
                pattern: z.string().min(3).max(30)
            }
        }
    ];

export default TyresFormFields;