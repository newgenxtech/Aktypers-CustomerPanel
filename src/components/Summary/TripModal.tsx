import { Form, Input, DatePicker, Radio, Modal, InputNumber, Button, Select } from 'antd';
import { useState } from 'react';

interface TripModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: unknown) => void;
    initialData?: unknown;
}

const TripModal = ({ isOpen, onClose, onSubmit, initialData }: TripModalProps) => {
    const [form] = Form.useForm();
    const [tripType, setTripType] = useState('single');
    const [basicItems, setBasicItems] = useState([{ key: 0 }]);
    const [expenseItems, setExpenseItems] = useState([{ key: 0 }]);

    const addBasicItem = () => {
        setBasicItems([...basicItems, { key: basicItems.length }]);
    };

    const removeBasicItem = (key: number) => {
        setBasicItems(basicItems.filter(item => item.key !== key));
    };

    const addExpenseItem = () => {
        setExpenseItems([...expenseItems, { key: expenseItems.length }]);
    };

    const removeExpenseItem = (key: number) => {
        setExpenseItems(expenseItems.filter(item => item.key !== key));
    };

    return (
        <Modal
            title="Trip Details"
            open={isOpen}
            onCancel={onClose}
            width={1000}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialData}
                onFinish={onSubmit}
            >
                <div className="bg-[#5B77A0] text-white p-3 mb-4">
                    <div className="text-sm">Petrol Price in Perambalur: ₹93.32 / Ltr - 0.32</div>
                </div>

                <div className="bg-[#5B77A0] text-white p-3 mb-4">BASIC DETAILS</div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="tripType">
                        <Radio.Group onChange={(e) => setTripType(e.target.value)} value={tripType}>
                            <Radio value="single">Single way</Radio>
                            <Radio value="double">Double way</Radio>
                        </Radio.Group>
                    </Form.Item>
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
                    <div className="flex gap-2 mb-2">
                        <button type="button" onClick={addBasicItem} className="px-3 py-1 bg-blue-600 text-white rounded">
                            Add Item
                        </button>
                        <button type="button" onClick={() => removeBasicItem(basicItems.length - 1)} className="px-3 py-1 bg-red-600 text-white rounded">
                            Delete Item
                        </button>
                    </div>

                    {basicItems.map((item) => (
                        <div key={item.key} className="grid grid-cols-5 gap-4 mb-2">
                            <Form.Item name={['items', item.key, 'item']}>
                                <Input placeholder="Item" />
                            </Form.Item>
                            <Form.Item name={['items', item.key, 'weight']}>
                                <InputNumber placeholder="Weight (in tons)" className="w-full" />
                            </Form.Item>
                            <Form.Item name={['items', item.key, 'tonageRate']}>
                                <InputNumber placeholder="Tonage Rate (Rs.)" className="w-full" />
                            </Form.Item>
                            <Form.Item name={['items', item.key, 'total']}>
                                <InputNumber placeholder="Total (Rs.)" className="w-full" />
                            </Form.Item>
                            <Form.Item name={['items', item.key, 'remarks']}>
                                <Input placeholder="Remarks" />
                            </Form.Item>
                        </div>
                    ))}
                </div>

                {/* Expenses Table */}
                <div className="mb-4">
                    <div className="text-lg font-bold mb-2">EXPENSES</div>
                    <div className="flex gap-2 mb-2">
                        <button type="button" onClick={addExpenseItem} className="px-3 py-1 bg-blue-600 text-white rounded">
                            Add Item
                        </button>
                        <button type="button" onClick={() => removeExpenseItem(expenseItems.length - 1)} className="px-3 py-1 bg-red-600 text-white rounded">
                            Delete Item
                        </button>
                    </div>

                    {expenseItems.map((item) => (
                        <div key={item.key} className="grid grid-cols-3 gap-4 mb-2">
                            <Form.Item name={['expenses', item.key, 'item']}>
                                <Input placeholder="Item" />
                            </Form.Item>
                            <Form.Item name={['expenses', item.key, 'amount']}>
                                <InputNumber placeholder="Amount" className="w-full" />
                            </Form.Item>
                            <Form.Item name={['expenses', item.key, 'remarks']}>
                                <Input placeholder="Remarks" />
                            </Form.Item>
                        </div>
                    ))}
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