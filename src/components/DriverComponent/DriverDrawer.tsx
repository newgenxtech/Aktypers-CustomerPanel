import React from 'react';
import { Drawer } from 'vaul';
import { Expand, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import FormComponentV2 from '@/components/FormComponentV2';
import { z } from 'zod';
import { DriverMaster } from '@/pages/Driver/Driver.d';

interface DriverDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    CurrentDriver: DriverMaster | null;
    handleCreateDriver: (data: DriverMaster) => void;
    handleUpdateDriver: (data: DriverMaster) => void;
}

const DriverDrawer: React.FC<DriverDrawerProps> = ({
    open,
    setOpen,
    isEdit,
    setIsEdit,
    CurrentDriver,
    handleCreateDriver,
    handleUpdateDriver
}) => {
    const navigate = useNavigate();

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
                                {isEdit ? 'Edit' : 'Add'} Driver Details
                            </Drawer.Title>
                            <Drawer.Description className="text-zinc-600 mb-2">
                                <FormComponentV2
                                    fields={[
                                        {
                                            label: 'Name',
                                            name: 'name',
                                            type: 'text',
                                            isInputProps: { placeholder: 'Enter Name' },
                                            validation: { required: true, pattern: z.string().min(3).max(30) }
                                        },
                                        {
                                            label: 'Customer ID',
                                            name: 'customerid',
                                            type: 'text',
                                            isInputProps: { placeholder: 'Enter Customer ID' },
                                            validation: { required: true, pattern: z.string().min(3).max(20) }
                                        },
                                        {
                                            label: 'License Number',
                                            name: 'license_number',
                                            type: 'text',
                                            isInputProps: { placeholder: 'Enter License Number' },
                                            validation: { required: true, pattern: z.string().min(3).max(20) }
                                        },
                                        {
                                            label: 'License Expiry Date',
                                            name: 'license_expiry_date',
                                            type: 'date',
                                            isInputProps: { placeholder: 'Enter License Expiry Date', defaultValue: isEdit ? CurrentDriver?.license_expiry_date : '' },
                                            validation: { required: true, pattern: z.string().refine((val) => new Date(val) >= new Date()) }
                                        },
                                        {
                                            label: 'Phone Number',
                                            name: 'phone_number',
                                            type: 'text',
                                            isInputProps: { placeholder: 'Enter Phone Number' },
                                            validation: { required: true, pattern: z.string().min(3).max(20) }
                                        },
                                        {
                                            label: 'Address',
                                            name: 'address',
                                            type: 'text',
                                            isInputProps: { placeholder: 'Enter Address' },
                                            validation: { required: true, pattern: z.string().min(3).max(120) }
                                        },
                                        {
                                            label: 'Date of Birth',
                                            name: 'date_of_birth',
                                            type: 'date',
                                            isInputProps: { placeholder: 'Enter Date of Birth', defaultValue: isEdit ? CurrentDriver?.date_of_birth : '' },
                                            validation: { required: true, pattern: z.string().refine((val) => new Date(val) >= new Date('1900-01-01') && new Date(val) <= new Date(), { message: "Date must be between 01-01-1900 and today" }) }
                                        },
                                        {
                                            label: 'Date of Joining',
                                            name: 'date_of_joining',
                                            type: 'date',
                                            isInputProps: { placeholder: 'Enter Date of Joining', defaultValue: isEdit ? CurrentDriver?.date_of_joining : '' },
                                            validation: { required: true, pattern: z.string().refine((val) => new Date(val) >= new Date('1900-01-01') && new Date(val) <= new Date(), { message: "Date must be between 01-01-1900 and today" }) }
                                        },
                                        {
                                            label: 'Emergency Contact',
                                            name: 'emergency_contact',
                                            type: 'text',
                                            isInputProps: { placeholder: 'Enter Emergency Contact' },
                                            validation: { required: true, pattern: z.string().min(3).max(20) }
                                        },
                                        {
                                            label: 'Status',
                                            name: 'status',
                                            type: 'select',
                                            isInputProps: { placeholder: 'Select Status' },
                                            validation: { required: true, pattern: z.string().min(3).max(20) },
                                            options: ['Active', 'Inactive']
                                        },
                                        {
                                            label: 'Aadhaar Pic',
                                            name: 'aadhaar_pic',
                                            type: 'upload',
                                            isInputProps: { placeholder: 'Enter Aadhaar Pic' },
                                            validation: { required: false, pattern: z.string().nullable() }
                                        },
                                        {
                                            label: 'Pancard Pic',
                                            name: 'pancard_pic',
                                            type: 'upload',
                                            isInputProps: { placeholder: 'Enter Pancard Pic' },
                                            validation: { required: false, pattern: z.string().nullable() }
                                        },
                                        {
                                            label: 'License Pic',
                                            name: 'license_pic',
                                            type: 'upload',
                                            isInputProps: { placeholder: 'Enter License Pic' },
                                            validation: { required: false, pattern: z.string().nullable() }
                                        },
                                        {
                                            label: 'Email',
                                            name: 'email',
                                            type: 'text',
                                            isInputProps: { placeholder: 'Enter Email' },
                                            validation: { required: true, pattern: z.string().min(3).max(40) }
                                        }
                                    ]}
                                    isUpdate={isEdit}
                                    onSubmit={(data) => {
                                        if (isEdit) {
                                            handleUpdateDriver(data as DriverMaster);
                                        } else {
                                            handleCreateDriver(data as DriverMaster);
                                        }
                                    }}
                                    initialValues={CurrentDriver}
                                />
                            </Drawer.Description>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default DriverDrawer;