/* eslint-disable @typescript-eslint/no-explicit-any */
//// filepath: /Users/adhavant/Documents/Freelance/Aktypers-CustomerPanel/src/components/Summary/TripModal.tsx
import React from 'react';
import {
    Modal,
    Button,
    Input,
    DatePicker,
    InputNumber,
    Select,
    Space,
    Table,
    Divider
} from 'antd';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DriverMaster } from '@/pages/Driver/Driver.d';
import { ITruckData } from '@/pages/Truck/Truck.d';


interface TripModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    initialData?: any;
    driverData: DriverMaster[];
    driverLoading: boolean;
    isEdit?: boolean;
    setIsEdit?: (value: boolean) => void;
    truckData: ITruckData[]
    truckLoading: boolean
}

export interface FormValues {
    currentMileage: number;
    closingMileage: number;
    date: any;
    driverName: string;
    truckNumber: string;
    from: string;
    to: string;
    tripType?: 'single' | 'double';
    items: {
        item: string;
        weight: number;
        tonageRate: number;
        remarks?: string;
    }[];
    expenses: {
        item: string;
        amount: number;
        remarks?: string;
    }[];
    returnDate?: any;
    returnDriverName?: string;
    returnFrom?: string;
    returnTo?: string;
}

const TripModal: React.FC<TripModalProps> = ({ isOpen, onClose, onSubmit, initialData,
    driverData,
    driverLoading,
    isEdit,
    truckData,
    truckLoading
}) => {
    const {
        control,
        handleSubmit,
        watch
    } = useForm<FormValues>({
        defaultValues: initialData || {
            currentMileage: undefined,
            closingMileage: undefined,
            date: null,
            driverName: '',
            from: '',
            to: '',
            tripType: 'single',
            items: [{ item: '', weight: 0, tonageRate: 0, remarks: '' }],
            expenses: [{ item: '', amount: 0, remarks: '' }]
        }
    });

    // For basic items
    const {
        fields: itemFields,
        append: appendItem,
        remove: removeItem
    } = useFieldArray({
        control,
        name: 'items'
    });

    // For expenses items
    const {
        fields: expenseFields,
        append: appendExpense,
        remove: removeExpense
    } = useFieldArray({
        control,
        name: 'expenses'
    });

    // Calculate total for a basic item row
    const renderTotal = (index: number) => {
        const weight = watch(`items.${index}.weight`) || 0;
        const tonageRate = watch(`items.${index}.tonageRate`) || 0;
        return weight * tonageRate;
    };

    const onFormSubmit = (values: FormValues) => {
        // Merge calculated totals into each item
        const itemsWithTotal = values.items.map((item, index) => ({
            ...item,
            total: renderTotal(index)
        }));
        onSubmit({ ...values, items: itemsWithTotal });
    };

    // Columns for Basic Items Table (inline editing)
    const basicColumns = [
        {
            title: 'S.No',
            render: (_: any, __: any, index: number) => index + 1
        },
        {
            title: 'Item',
            render: (_: any, record: any, index: number) => (
                <Controller
                    name={`items.${index}.item`}
                    control={control}
                    rules={{ required: 'Required' }}
                    render={({ field }) => <Input placeholder="Item" {...field} />}
                />
            )
        },
        {
            title: 'Weight (in tons)',
            render: (_: any, record: any, index: number) => (
                <Controller
                    name={`items.${index}.weight`}
                    control={control}
                    rules={{ required: 'Required' }}
                    render={({ field }) => (
                        <InputNumber placeholder="Weight (in tons)" style={{ width: '100%' }} {...field} />
                    )}
                />
            )
        },
        {
            title: 'Tonage Rate (Rs.)',
            render: (_: any, record: any, index: number) => (
                <Controller
                    name={`items.${index}.tonageRate`}
                    control={control}
                    rules={{ required: 'Required' }}
                    render={({ field }) => (
                        <InputNumber placeholder="Tonage Rate" style={{ width: '100%' }} {...field} />
                    )}
                />
            )
        },
        {
            title: 'Total (Rs.)',
            render: (_: any, record: any, index: number) => <div>{renderTotal(index)}</div>
        },
        {
            title: 'Remarks',
            render: (_: any, record: any, index: number) => (
                <Controller
                    name={`items.${index}.remarks`}
                    control={control}
                    render={({ field }) => <Input placeholder="Remarks" {...field} />}
                />
            )
        }
    ];

    // Columns for Expenses Table (inline editing)
    const expenseColumns = [
        {
            title: 'S.No',
            render: (_: any, __: any, index: number) => index + 1
        },
        {
            title: 'Item',
            render: (_: any, record: any, index: number) => (
                <Controller
                    name={`expenses.${index}.item`}
                    control={control}
                    rules={{ required: 'Required' }}
                    render={({ field }) => <Input placeholder="Item" {...field} />}
                />
            )
        },
        {
            title: 'Amount',
            render: (_: any, record: any, index: number) => (
                <Controller
                    name={`expenses.${index}.amount`}
                    control={control}
                    rules={{ required: 'Required' }}
                    render={({ field }) => (
                        <InputNumber placeholder="Amount" style={{ width: '100%' }} {...field} />
                    )}
                />
            )
        },
        {
            title: 'Remarks',
            render: (_: any, record: any, index: number) => (
                <Controller
                    name={`expenses.${index}.remarks`}
                    control={control}
                    render={({ field }) => <Input placeholder="Remarks" {...field} />}
                />
            )
        }
    ];

    return (
        <Modal
            title="Trip Details"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={1000}
            className="h-[70vh] overflow-auto rounded-md"
        >
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Divider />
                {/* <div className="bg-[#5B77A0] text-white p-3 mb-4 rounded-md">
                    <div className="text-sm">
                        Petrol Price in Perambalur: ₹93.32 / Ltr - 0.32
                    </div>
                </div> */}

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label>Current Mileage</label>
                        <Controller
                            name="currentMileage"
                            control={control}
                            rules={{ required: 'Required' }}
                            render={({ field }) => <InputNumber placeholder="Current Mileage" className="w-full" {...field} />}
                        />
                    </div>
                    <div>
                        <label>Closing Mileage</label>
                        <Controller
                            name="closingMileage"
                            control={control}
                            rules={{ required: 'Required' }}
                            render={({ field }) => <InputNumber placeholder="Closing Mileage" className="w-full" {...field} />}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label>Date</label>
                        <Controller
                            name="date"
                            control={control}
                            rules={{ required: 'Required' }}
                            render={({ field }) => <DatePicker className="w-full" format="DD/MM/YYYY" {...field} />}
                        />
                    </div>
                    <div>
                        <label>Driver Name</label>
                        <Controller
                            name="driverName"
                            control={control}
                            rules={{ required: 'Required' }}
                            render={({ field }) => (
                                <Select
                                    placeholder="Select driver"
                                    className="w-full"
                                    options={
                                        driverData &&
                                        driverData?.map((driver) => ({
                                            label: driver.name,
                                            value: driver.id
                                        }))
                                    }
                                    loading={driverLoading}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    {/* 
                        Truck Number
                    */}
                    <div>
                        <label>Truck Number</label>
                        <Controller
                            name="truckNumber"
                            control={control}
                            rules={{ required: 'Required' }}
                            render={({ field }) => (
                                <Select
                                    placeholder="Select truck"
                                    className="w-full"
                                    options={
                                        truckData &&
                                        truckData?.map((truck) => ({
                                            label: truck.registration_number,
                                            value: truck.id
                                        }))
                                    }
                                    loading={truckLoading}
                                    {...field}
                                />
                            )}
                            defaultValue={initialData?.truckNumber}
                            disabled={isEdit}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label>From</label>
                        <Controller
                            name="from"
                            control={control}
                            rules={{ required: 'Required' }}
                            render={({ field }) => <Input placeholder="From" {...field} />}
                        />
                    </div>
                    <div>
                        <label>To</label>
                        <Controller
                            name="to"
                            control={control}
                            rules={{ required: 'Required' }}
                            render={({ field }) => <Input placeholder="To" {...field} />}
                        />
                    </div>
                </div>

                {/* <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label>Calculated Distance</label>
                        <Input disabled />
                    </div>
                    <div>
                        <label>Mileage</label>
                        <InputNumber className="w-full" placeholder="Mileage" />
                    </div>
                    <div>
                        <label>Expected Amount</label>
                        <InputNumber className="w-full" placeholder="Expected Amount" disabled />
                    </div>
                </div> */}

                {/* Basic Items Table */}
                <div className="mb-4">
                    <div className="text-lg font-bold mb-2">BASIC ITEMS</div>
                    <Table
                        dataSource={itemFields}
                        columns={basicColumns}
                        rowKey="id"
                        size="small"
                        pagination={{
                            showQuickJumper: true,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50', '100', '200'],
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            total: itemFields.length,
                            pageSize: 10
                        }}
                        footer={() => (
                            <div
                                className='flex justify-between gap-2'
                            >
                                <Space>
                                    <Button type="primary" onClick={() => appendItem({ item: '', weight: 0, tonageRate: 0, remarks: '' })}>
                                        Add Item
                                    </Button>
                                    <Button
                                        danger
                                        onClick={() => {
                                            if (itemFields.length > 0) {
                                                removeItem(itemFields.length - 1);
                                                toast.success('Item removed successfully');
                                            }
                                        }}
                                    >
                                        Delete Item
                                    </Button>
                                </Space>

                                <div className="flex justify-end gap-2">
                                    <div className="text-lg font-bold">Total Amount:</div>
                                    <div className="text-lg font-bold">
                                        {itemFields.reduce((acc, _item, index) => acc + renderTotal(index), 0)}
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>

                {/* Expenses Table */}
                <div className="mb-4">
                    <div className="text-lg font-bold mb-2">EXPENSES</div>

                    <Table
                        dataSource={expenseFields}
                        columns={expenseColumns}
                        rowKey="id"
                        size="small"
                        pagination={{
                            showQuickJumper: true,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50', '100', '200'],
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            total: expenseFields.length,
                            pageSize: 10
                        }}
                        footer={() => (
                            <div
                                className='flex justify-between gap-2'
                            >
                                <Space>
                                    <Button type="primary" onClick={() => appendExpense({ item: '', amount: 0, remarks: '' })}>
                                        Add Item
                                    </Button>
                                    <Button
                                        danger
                                        onClick={() => {
                                            if (expenseFields.length > 0) {
                                                removeExpense(expenseFields.length - 1);
                                                toast.success('Item removed successfully');
                                            }
                                        }}
                                    >
                                        Delete Item
                                    </Button>
                                </Space>
                                <div className="flex justify-end gap-2">
                                    <div className="text-lg font-bold">Total Expenses:</div>
                                    <div className="text-lg font-bold">
                                        {expenseFields.reduce((acc, _item, index) => acc +
                                            watch(`expenses.${index
                                                }.amount`) || 0, 0)}
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>

                {/* Optionally show return details for double trips */}
                {watch('tripType') === 'double' && (
                    <>
                        <div className="bg-[#5B77A0] text-white p-3 mb-4">RETURN DETAILS</div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label>Return Date</label>
                                <Controller
                                    name="returnDate"
                                    control={control}
                                    rules={{ required: 'Required' }}
                                    render={({ field }) => <DatePicker className="w-full" format="DD/MM/YYYY" {...field} />}
                                />
                            </div>
                            <div>
                                <label>Return Driver Name</label>
                                <Controller
                                    name="returnDriverName"
                                    control={control}
                                    rules={{ required: 'Required' }}
                                    render={({ field }) => (
                                        <Select placeholder="Select driver" className="w-full" {...field}>
                                            {/* Options here */}
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label>Return From</label>
                                <Controller
                                    name="returnFrom"
                                    control={control}
                                    rules={{ required: 'Required' }}
                                    render={({ field }) => <Input placeholder="Return From" {...field} />}
                                />
                            </div>
                            <div>
                                <label>Return To</label>
                                <Controller
                                    name="returnTo"
                                    control={control}
                                    rules={{ required: 'Required' }}
                                    render={({ field }) => <Input placeholder="Return To" {...field} />}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <label>Calculated Distance</label>
                                <Input disabled />
                            </div>
                            <div>
                                <label>Mileage</label>
                                <InputNumber className="w-full" placeholder="Mileage" />
                            </div>
                            <div>
                                <label>Expected Amount</label>
                                <InputNumber className="w-full" placeholder="Expected Amount" disabled />
                            </div>
                        </div>
                    </>
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onClose}>Reset</Button>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TripModal;