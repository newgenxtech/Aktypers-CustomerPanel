/* eslint-disable @typescript-eslint/no-explicit-any */
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
import ItemMasterSelectDropDown from './ItemMasterSelectDropDown';
import dayjs from 'dayjs';
import { TripDetails } from '@/pages/Trip/Trip';


interface TripModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    initialData?: TripDetails;
    driverData: DriverMaster[];
    driverLoading: boolean;
    isEdit?: boolean;
    setIsEdit?: (value: boolean) => void;
    truckData: ITruckData[]
    truckLoading: boolean
    itemMasterData: {
        id: number
        name: string
        customer: number
    }[]
    itemMasterLoading: boolean
}

export interface FormValues {
    currentMileage: number;
    date: any;
    driverId: number;
    truckNumber: string;
    from: string;
    to: string;
    // tripType?: 'single' | 'double';
    items: {
        item: number;
        weight: number;
        tonageRate: number;
        remarks?: string;
    }[];
    expenses: {
        item: number;
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
    truckLoading,
    itemMasterData,
    itemMasterLoading
}) => {
    console.log('initialData', initialData);
    const parseJsonSafely = (jsonString: string | null | undefined, defaultValue: any[] = []) => {
        if (!jsonString || jsonString === '[]') return defaultValue;
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('JSON Parse Error:', error);
            console.log('Invalid JSON string:', jsonString);
            return defaultValue;
        }
    };

    const {
        control,
        handleSubmit,
        watch,
        reset
    } = useForm<FormValues>({
        defaultValues: initialData ? {
            currentMileage: Number(initialData.current_km) || 0,
            date: initialData.trip_date ? dayjs(initialData.trip_date) : null,
            driverId: Number(initialData.driverid) || undefined,
            truckNumber: initialData.truck_no || '',
            from: initialData.from_location || '',
            to: initialData.to_location || '',
            items: parseJsonSafely(initialData.trip_items)
                .filter((item: any) => item !== null)  // Filter out null values
                .map((item: any) => ({
                    item: Number(item.item),
                    weight: Number(item.weight) || 0,
                    tonageRate: Number(item.tonnage_rate) || 0,
                    remarks: item.remarks && item.remarks !== undefined && item.remarks !== null ? item.remarks : ''
                })) || [],
            expenses: parseJsonSafely(initialData.expense_items)  // Changed from driverexpense to expense_items
                .filter((expense: any) => expense !== null)  // Filter out null values
                .map((expense: any) => ({
                    item: Number(expense.item),
                    amount: Number(expense.total) || 0,  // Changed from amount to total
                    remarks: expense.remarks && expense.remarks !== undefined && expense.remarks !== null ? expense.remarks : ''
                })) || []
        } : {
            // ... default values remain the same
            items: [{ item: 0, weight: 0, tonageRate: 0, remarks: '' }],
            expenses: [{ item: 0, amount: 0, remarks: '' }]
        }
    });

    // Update useEffect reset logic as well
    React.useEffect(() => {
        if (initialData) {
            reset({
                currentMileage: Number(initialData.current_km) || 0,
                date: initialData.trip_date ? dayjs(initialData.trip_date) : null,
                driverId: Number(initialData.driverid) || undefined,
                truckNumber: initialData.truck_no || '',
                from: initialData.from_location || '',
                to: initialData.to_location || '',
                items: parseJsonSafely(initialData.trip_items)
                    .filter((item: any) => item !== null)
                    .map((item: any) => ({
                        item: Number(item.item),
                        weight: Number(item.weight) || 0,
                        tonageRate: Number(item.tonnage_rate) || 0,
                        remarks: item.remarks && item.remarks !== undefined && item.remarks !== null ? item.remarks : ''
                    })) || [{ item: 0, weight: 0, tonageRate: 0, remarks: '' }],
                expenses: parseJsonSafely(initialData.expense_items)
                    .filter((expense: any) => expense !== null)
                    .map((expense: any) => ({
                        item: Number(expense.item),
                        amount: Number(expense.total) || 0,
                        remarks: expense.remarks && expense.remarks !== undefined && expense.remarks !== null ? expense.remarks : ''
                    })) || [{ item: 0, amount: 0, remarks: '' }]
            });
        }
    }, [initialData, reset]);

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
            render: (_: any, _record: any, index: number) => (
                <Controller
                    name={`items.${index}.item`}
                    control={control}
                    rules={{ required: 'Required' }}
                    render={({ field }) =>
                        <ItemMasterSelectDropDown
                            itemMasterData={itemMasterData}
                            itemMasterLoading={itemMasterLoading}
                            {...field}
                        />
                    }
                />
            )
        },
        {
            title: 'Weight (in tons)',
            render: (_: any, _record: any, index: number) => (
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
            render: (_: any, _record: any, index: number) => (
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
            render: (_: any, _record: any, index: number) => <div>{renderTotal(index)}</div>
        },
        {
            title: 'Remarks',
            render: (_: any, _record: any, index: number) => (
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
            render: (_: any, _record: any, index: number) => (
                <Controller
                    name={`expenses.${index}.item`}
                    control={control}
                    rules={{ required: 'Required' }}
                    render={({ field }) =>
                        <ItemMasterSelectDropDown
                            itemMasterData={itemMasterData}
                            itemMasterLoading={itemMasterLoading}
                            {...field}
                        />
                    }
                />
            )
        },
        {
            title: 'Amount',
            render: (_: any, _record: any, index: number) => (
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
            render: (_: any, _record: any, index: number) => (
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
                        <label>Date</label>
                        <Controller
                            name="date"
                            control={control}
                            rules={{ required: 'Required' }}
                            render={({ field }) => <DatePicker className="w-full" format="DD/MM/YYYY" {...field} />}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">

                    <div>
                        <label>Driver Name</label>
                        <Controller
                            name="driverId"
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
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
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
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
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
                            // defaultValue={initialData?.truckNumber} 
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
                                    <Button type="primary" onClick={() => appendItem({ item: 0, weight: 0, tonageRate: 0, remarks: '' })}>
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
                                    <Button type="primary" onClick={() => appendExpense({ item: 0, amount: 0, remarks: '' })}>
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
                <Divider />
                <div className="flex justify-end gap-2 mt-4">
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TripModal;