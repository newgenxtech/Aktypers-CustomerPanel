/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, DatePicker, Modal, InputNumber, Button, Select, Space, Table } from 'antd';
import { Key, useState } from 'react';
import toast from 'react-hot-toast';

interface TripModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: unknown) => void;
    initialData?: any;
}

const TripModal = ({ isOpen, onClose, onSubmit, initialData }: TripModalProps) => {
    const [form] = Form.useForm();
    const [tripType, setTripType] = useState('single');
    const [basicItems, setBasicItems] = useState([{ key: 0 }]);
    const [expenseItems, setExpenseItems] = useState([{ key: 0 }]);
    const [selectedBasicItems, setSelectedBasicItems] = useState<Key[]>([]);
    const [selectedExpenseItems, setSelectedExpenseItems] = useState<Key[]>([]);




    const addBasicItem = () => {
        setBasicItems([...basicItems, { key: basicItems.length }]);
    };

    const removeBasicItem = (key: number) => {
        if (selectedBasicItems) {
            setSelectedBasicItems(selectedBasicItems.filter(item => item !== key));
        } else {
            setBasicItems(basicItems.filter(item => item.key !== key));
        }
        return toast.success('Item removed successfully');
    };

    const addExpenseItem = () => {
        setExpenseItems([...expenseItems, { key: expenseItems.length }]);
    };

    const removeExpenseItem = (key: number) => {
        if (selectedExpenseItems) {
            setSelectedExpenseItems(selectedExpenseItems.filter(item => item !== key));
        } else {
            setExpenseItems(expenseItems.filter(item => item.key !== key));
        }
        return toast.success('Item removed successfully');
    };


    // Columns for Basic Items Table (inline editing)
    const basicColumns = [
        {
            // s.no
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (_: any, record: any) => record.key + 1,
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: (_: any, record: any) => (
                <Form.Item
                    name={['items', record.key, 'item']}
                    rules={[{ required: true, message: 'Required' }]}
                    style={{ margin: 0 }}
                >
                    <Input placeholder="Item" />
                </Form.Item>
            ),
        },
        {
            title: 'Weight (in tons)',
            dataIndex: 'weight',
            key: 'weight',
            render: (_: any, record: any) => (
                <Form.Item
                    name={['items', record.key, 'weight']}
                    rules={[{ required: true, message: 'Required' }]}
                    style={{ margin: 0 }}
                >
                    <InputNumber placeholder="Weight (in tons)" style={{ width: '100%' }} />
                </Form.Item>
            ),
        },
        {
            title: 'Tonage Rate (Rs.)',
            dataIndex: 'tonageRate',
            key: 'tonageRate',
            render: (_: any, record: any) => (
                <Form.Item
                    name={['items', record.key, 'tonageRate']}
                    rules={[{ required: true, message: 'Required' }]}
                    style={{ margin: 0 }}
                >
                    <InputNumber placeholder="Tonage Rate (Rs.)" style={{ width: '100%' }} />
                </Form.Item>
            ),
        },
        {
            title: 'Total (Rs.)',
            dataIndex: 'total',
            key: 'total',
            render: (_: any, record: any) => (
                <Form.Item
                    name={['items', record.key, 'total']}
                    rules={[{ required: true, message: 'Required' }]}
                    style={{ margin: 0 }}
                >
                    <InputNumber placeholder="Total (Rs.)" style={{ width: '100%' }} />
                </Form.Item>
            ),
        },
        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
            render: (_: any, record: any) => (
                <Form.Item name={['items', record.key, 'remarks']} style={{ margin: 0 }}>
                    <Input placeholder="Remarks" />
                </Form.Item>
            ),
        },
    ];

    // Columns for Expenses Table (inline editing)
    const expenseColumns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (_: any, record: any) => record.key + 1,
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: (_: any, record: any) => (
                <Form.Item
                    name={['expenses', record.key, 'item']}
                    rules={[{ required: true, message: 'Required' }]}
                    style={{ margin: 0 }}
                >
                    <Input placeholder="Item" />
                </Form.Item>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (_: any, record: any) => (
                <Form.Item
                    name={['expenses', record.key, 'amount']}
                    rules={[{ required: true, message: 'Required' }]}
                    style={{ margin: 0 }}
                >
                    <InputNumber placeholder="Amount" style={{ width: '100%' }} />
                </Form.Item>
            ),
        },
        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
            render: (_: any, record: any) => (
                <Form.Item name={['expenses', record.key, 'remarks']} style={{ margin: 0 }}>
                    <Input placeholder="Remarks" />
                </Form.Item>
            ),
        },
    ];

    return (
        <Modal
            title="Trip Details"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={1000}
            className='h-[70vh] overflow-auto rounded-md'
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialData}
                onFinish={onSubmit}
            >
                <div className="bg-[#5B77A0] text-white p-3 mb-4 rounded-md">
                    <div className="text-sm">Petrol Price in Perambalur: ₹93.32 / Ltr - 0.32</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Current Mileage"
                        name="currentMileage"
                    >
                        <InputNumber className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Closing Mileage"
                        name="closingMileage"
                    >
                        <InputNumber className="w-full" />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker className="w-full" format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item
                        label="Driver Name"
                        name="driverName"
                        rules={[{ required: true }]}
                    >
                        <Select className="w-full">
                            {/* Add driver options here */}
                        </Select>
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="From"
                        name="from"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Type to search location" />
                    </Form.Item>
                    <Form.Item
                        label="To"
                        name="to"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Type to search location" />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <Form.Item label="Calculated Distance">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Mileage">
                        <InputNumber className="w-full" />
                    </Form.Item>
                    <Form.Item label="Expected amount">
                        <InputNumber className="w-full" disabled />
                    </Form.Item>
                </div>

                {/* Basic Items Table */}
                <div className="mb-4">
                    <Space style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={addBasicItem}>
                            Add Item
                        </Button>
                        <Button danger onClick={() => removeBasicItem(basicItems[basicItems.length - 1]?.key)}>
                            Delete Item
                        </Button>
                    </Space>
                    <Table
                        dataSource={basicItems}
                        columns={basicColumns}
                        rowKey="key"
                        rowSelection={{
                            type: 'checkbox',
                            onChange: (selectedRowKeys, selectedRows) => {
                                console.log(selectedRowKeys, selectedRows);
                                setSelectedBasicItems(selectedRowKeys);
                            }
                        }}
                        size='small'
                        pagination={{
                            showQuickJumper: true,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50', '100', '200'],
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            total: basicItems.length,
                            pageSize: 10
                        }}
                        footer={
                            () => (
                                <div className="flex justify-end gap-2">
                                    <div className="text-lg font-bold">Total Amount:</div>
                                    <div className="text-lg font-bold">₹ 0.00</div>
                                </div>
                            )
                        }
                    />
                </div>

                {/* Expenses Table with AntD Table and inline editing */}
                <div className="mb-4">
                    <div className="text-lg font-bold mb-2">EXPENSES</div>
                    <Space style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={addExpenseItem}>
                            Add Item
                        </Button>
                        <Button danger onClick={() => removeExpenseItem(expenseItems[expenseItems.length - 1]?.key)}>
                            Delete Item
                        </Button>
                    </Space>
                    <Table
                        dataSource={expenseItems}
                        columns={expenseColumns}
                        rowKey="key"
                        rowSelection={{
                            type: 'checkbox',
                            onChange: (selectedRowKeys, selectedRows) => {
                                console.log(selectedRowKeys, selectedRows);
                                setSelectedExpenseItems(selectedRowKeys);
                            }
                        }}
                        size='small'
                        pagination={{
                            showQuickJumper: true,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50', '100', '200'],
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            total: basicItems.length,
                            pageSize: 10
                        }}
                        // show total amount of expenses
                        footer={
                            () => (
                                <div className="flex justify-end gap-2">
                                    <div className="text-lg font-bold">Total Expenses:</div>
                                    <div className="text-lg font-bold">₹ 0.00</div>
                                </div>
                            )
                        }
                    />
                </div>

                {tripType === 'double' && (
                    <>
                        <div className="bg-[#5B77A0] text-white p-3 mb-4">RETURN DETAILS</div>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                label="Return Date"
                                name="returnDate"
                                rules={[{ required: true }]}
                            >
                                <DatePicker className="w-full" format="DD/MM/YYYY" />
                            </Form.Item>
                            <Form.Item
                                label="Return Driver Name"
                                name="returnDriverName"
                                rules={[{ required: true }]}
                            >
                                <Select className="w-full">
                                    {/* Add driver options here */}
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                label="Return From"
                                name="returnFrom"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Type to search location" />
                            </Form.Item>
                            <Form.Item
                                label="Return To"
                                name="returnTo"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Type to search location" />
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <Form.Item label="Calculated Distance">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item label="Mileage">
                                <InputNumber className="w-full" />
                            </Form.Item>
                            <Form.Item label="Expected amount">
                                <InputNumber className="w-full" disabled />
                            </Form.Item>
                        </div>
                    </>
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onClose}>
                        Reset
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default TripModal;