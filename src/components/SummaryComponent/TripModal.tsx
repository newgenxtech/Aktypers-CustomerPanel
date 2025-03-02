/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
    Modal,
    Button,
    Input,
    DatePicker,
    InputNumber,
    Select,
    Space,
    Table,
    Divider,
} from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { DriverMaster } from "@/pages/Driver/Driver.d";
import { ITruckData } from "@/pages/Truck/Truck.d";
import ItemMasterSelectDropDown from "./ItemMasterSelectDropDown";
import dayjs from "dayjs";
import { TripDetails } from "@/pages/Trip/Trip";
import { useDeleteTripDetail, UserProfile } from "@/hooks/GetHooks";

interface TripModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    initialData?: TripDetails;
    driverData: DriverMaster[];
    driverLoading: boolean;
    isEdit?: boolean;
    setIsEdit?: (value: boolean) => void;
    truckData: ITruckData[];
    truckLoading: boolean;
    itemMasterData: {
        id: number;
        name: string;
        customer: number;
    }[];
    itemMasterLoading: boolean;
    profileData: UserProfile;
    profileDataloading: boolean;
}

export interface FormValues {
    currentMileage: number;
    customer: string;
    date: any;
    driverId: number;
    truckNumber: string;
    from: string;
    to: string;
    customerName: string;
    items: {
        existingId?: number | undefined;
        item: number;
        weight: number;
        tonageRate: number;
        remarks?: string;
    }[];
    expenses: {
        existingId?: number | undefined;
        item: number;
        amount: number;
        remarks?: string;
    }[];
    returnDate?: any;
    returnDriverName?: string;
    returnFrom?: string;
    returnTo?: string;
}

const TripModal: React.FC<TripModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    driverData,
    driverLoading,
    isEdit,
    truckData,
    truckLoading,
    itemMasterData,
    itemMasterLoading,
    profileData,
}) => {
    console.table(initialData);
    const parseJsonSafely = (
        jsonString: string | null | undefined,
        defaultValue: any[] = [],
    ) => {
        if (!jsonString || jsonString === "[]") return defaultValue;
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error("JSON Parse Error:", error);
            console.log("Invalid JSON string:", jsonString);
            return defaultValue;
        }
    };

    const [selectedTripitems, setSelectedTripitems] = React.useState<
        {
            item: number;
            weight: number;
            tonageRate: number;
            remarks?: string;
        }[]
    >([]);
    const [selectedTripExpenses, setSelectedTripExpenses] = React.useState<
        {
            item: number;
            amount: number;
            remarks?: string;
        }[]
    >([]);

    const { control, handleSubmit, watch, reset } = useForm<FormValues>({
        defaultValues: initialData
            ? {
                customer: initialData.customer || "",
                currentMileage: Number(initialData.current_km) || 0,
                date: initialData.trip_date ? dayjs(initialData.trip_date) : null,
                driverId: Number(initialData.driverid) || undefined,
                truckNumber: initialData.truck_no || "",
                from: initialData.from_location || "",
                to: initialData.to_location || "",
                items:
                    parseJsonSafely(initialData.trip_items)
                        .filter((item: any) => item !== null) // Filter out null values
                        .map((item: any) => ({
                            ...item,
                            item: Number(item.item) || 0,
                            weight: Number(item.weight) || 0,
                            tonageRate: Number(item.tonnage_rate) || 0,
                            remarks:
                                item.remarks &&
                                    item.remarks !== undefined &&
                                    item.remarks !== null
                                    ? item.remarks
                                    : "",
                        })) || [],
                expenses:
                    parseJsonSafely(initialData.expense_items) // Changed from driverexpense to expense_items
                        .filter((expense: any) => expense !== null) // Filter out null values
                        .map((expense: any) => ({
                            ...expense,
                            item: Number(expense.item) || 0,
                            amount: Number(expense.total) || 0, // Changed from amount to total
                            remarks:
                                expense.remarks &&
                                    expense.remarks !== undefined &&
                                    expense.remarks !== null
                                    ? expense.remarks
                                    : "",
                        })) || [],
            }
            : {
                // ... default values remain the same
                items: [{ item: 0, weight: 0, tonageRate: 0, remarks: "" }],
                expenses: [{ item: 0, amount: 0, remarks: "" }],
            },
    });

    // Update useEffect reset logic as well
    React.useEffect(() => {
        if (initialData) {
            reset({
                customer: initialData.customer || "",
                currentMileage: Number(initialData.current_km) || 0,
                date: initialData.trip_date ? dayjs(initialData.trip_date) : null,
                driverId: Number(initialData.driverid) || undefined,
                truckNumber: initialData.truck_no || "",
                from: initialData.from_location || "",
                to: initialData.to_location || "",
                items: parseJsonSafely(initialData.trip_items)
                    .filter((item: any) => item !== null)
                    .map((item: any) => ({
                        ...item,
                        existingId: item.id,
                        item: Number(item.item) || 0,
                        weight: Number(item.weight) || 0,
                        tonageRate: Number(item.tonnage_rate) || 0,
                        remarks:
                            item.remarks &&
                                item.remarks !== undefined &&
                                item.remarks !== null
                                ? item.remarks
                                : "",
                    })) || [{ item: 0, weight: 0, tonageRate: 0, remarks: "" }],
                expenses: parseJsonSafely(initialData.expense_items)
                    .filter((expense: any) => expense !== null)
                    .map((expense: any) => ({
                        ...expense,
                        existingId: expense.id,
                        item: Number(expense.item) || 0,
                        amount: Number(expense.total) || 0,
                        remarks:
                            expense.remarks &&
                                expense.remarks !== undefined &&
                                expense.remarks !== null
                                ? expense.remarks
                                : "",
                    })) || [{ item: 0, amount: 0, remarks: "" }],
            });
        }
    }, [initialData, reset]);

    // For basic items
    const {
        fields: itemFields,
        append: appendItem,
        remove: removeItem,
    } = useFieldArray({
        control,
        name: "items",
    });

    // For expenses items
    const {
        fields: expenseFields,
        append: appendExpense,
        remove: removeExpense,
    } = useFieldArray({
        control,
        name: "expenses",
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
            total: renderTotal(index),
        }));
        onSubmit({ ...values, items: itemsWithTotal });
    };

    // Columns for Basic Items Table (inline editing)
    const basicColumns = [
        {
            title: "S.No",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Item",
            render: (_: any, _record: any, index: number) => (
                <Controller
                    name={`items.${index}.item`}
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                        <ItemMasterSelectDropDown
                            itemMasterData={itemMasterData}
                            itemMasterLoading={itemMasterLoading}
                            {...field}
                        />
                    )}
                />
            ),
        },
        {
            title: "Weight (in tons)",
            render: (_: any, _record: any, index: number) => (
                <Controller
                    name={`items.${index}.weight`}
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                        <InputNumber
                            placeholder="Weight (in tons)"
                            style={{ width: "100%" }}
                            {...field}
                        />
                    )}
                />
            ),
        },
        {
            title: "Tonage Rate (Rs.)",
            render: (_: any, _record: any, index: number) => (
                <Controller
                    name={`items.${index}.tonageRate`}
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                        <InputNumber
                            placeholder="Tonage Rate"
                            style={{ width: "100%" }}
                            {...field}
                        />
                    )}
                />
            ),
        },
        {
            title: "Total (Rs.)",
            render: (_: any, _record: any, index: number) => (
                <div>{renderTotal(index)}</div>
            ),
        },
        {
            title: "Remarks",
            render: (_: any, _record: any, index: number) => (
                <Controller
                    name={`items.${index}.remarks`}
                    control={control}
                    render={({ field }) => <Input placeholder="Remarks" {...field} />}
                />
            ),
        },
    ];

    // Columns for Expenses Table (inline editing)
    const expenseColumns = [
        {
            title: "S.No",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Item",
            render: (_: any, _record: any, index: number) => (
                <Controller
                    name={`expenses.${index}.item`}
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                        <ItemMasterSelectDropDown
                            itemMasterData={itemMasterData}
                            itemMasterLoading={itemMasterLoading}
                            {...field}
                        />
                    )}
                />
            ),
        },
        {
            title: "Amount",
            render: (_: any, _record: any, index: number) => (
                <Controller
                    name={`expenses.${index}.amount`}
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                        <InputNumber
                            placeholder="Amount"
                            style={{ width: "100%" }}
                            {...field}
                        />
                    )}
                />
            ),
        },
        {
            title: "Remarks",
            render: (_: any, _record: any, index: number) => (
                <Controller
                    name={`expenses.${index}.remarks`}
                    control={control}
                    render={({ field }) => <Input placeholder="Remarks" {...field} />}
                />
            ),
        },
    ];

    const deleteItem = useDeleteTripDetail();

    const handlePrintPreview = () => {
        const includeExpenses = window.confirm(
            "Do you want to include expenses in the print preview?",
        );

        // Calculate totals
        const basicItemsTotal = itemFields.reduce((total, _item, index) => {
            const weight = watch(`items.${index}.weight`) || 0;
            const tonageRate = watch(`items.${index}.tonageRate`) || 0;
            return total + weight * tonageRate;
        }, 0);

        const expensesTotal = expenseFields.reduce((total, _expense, index) => {
            return total + (watch(`expenses.${index}.amount`) || 0);
        }, 0);

        const printWindow = window.open("", "_blank");

        if (printWindow) {
            printWindow.document.write(`
            <html>
            <head>
                <title>Trip Details</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        padding-bottom: 10px;
                        border-bottom: 2px solid #333;
                    }
                    .details {
                        margin-bottom: 30px;
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 15px;
                    }
                    .details p {
                        margin: 5px 0;
                    }
                    .items-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 30px;
                    }
                    .items-table th,
                    .items-table td {
                        border: 1px solid #ddd;
                        padding: 12px 8px;
                        text-align: left;
                    }
                    .items-table th {
                        background-color: #f5f5f5;
                        font-weight: bold;
                    }
                    .total-row {
                        background-color: #f9f9f9;
                        font-weight: bold;
                    }
                    .grand-total {
                        margin-top: 20px;
                        text-align: right;
                        font-size: 1.1em;
                        font-weight: bold;
                    }
                    @media print {
                        body { print-color-adjust: exact; }
                        .no-print { display: none; }
                        @page { margin: 2cm; }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0;">Trip Details</h1>
                        <p style="margin: 5px 0; color: #666;">Generated on: ${dayjs().format("DD-MM-YYYY HH:mm")}</p>
                    </div>
                    <div class="details">
                        <div>
                            <p><strong>Date:</strong> ${watch("date")?.format("DD-MM-YYYY") || "N/A"}</p>
                            <p><strong>Driver:</strong> ${driverData.find((d) => d.id === watch("driverId"))?.name || "N/A"}</p>
                            <p><strong>Current Mileage:</strong> ${watch("currentMileage") || "N/A"}</p>
                        </div>
                        <div>
                            <p><strong>Truck Number:</strong> ${truckData.find((t) => t.id === watch("truckNumber"))?.registration_number || "N/A"}</p>
                            <p><strong>From:</strong> ${watch("from") || "N/A"}</p>
                            <p><strong>To:</strong> ${watch("to") || "N/A"}</p>
                        </div>
                        <div>
                            <p><strong>Customer:</strong> ${watch("customer") || "N/A"}</p>
                            <img src="https://aktyres-in.stackstaging.com/php-truck/class/${profileData?.pic}" alt="Customer Logo" style="max-width: 50px; max-height:50px; border-radius: 50%;"/>
                        </div>
                    </div>

                    <h2>Basic Items</h2>
                    <table class="items-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Item</th>
                                <th>Weight (tons)</th>
                                <th>Rate (Rs.)</th>
                                <th>Total (Rs.)</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${watch("items")
                    .map(
                        (item: any, index: number) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${itemMasterData?.find((m) => m.id === item.item.toString())?.name || "N/A"}</td>
                                    <td>${item.weight || 0}</td>
                                    <td>${item.tonageRate || 0}</td>
                                    <td>${(item.weight || 0) * (item.tonageRate || 0)}</td>
                                    <td>${item.remarks || ""}</td>
                                </tr>
                            `,
                    )
                    .join("")}
                        </tbody>
                        <tfoot>
                            <tr class="total-row">
                                <td colspan="4" style="text-align: right;"><strong>Items Total:</strong></td>
                                <td colspan="2"><strong>Rs. ${basicItemsTotal.toFixed(2)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>

                    ${includeExpenses
                    ? `
                        <h2>Expenses</h2>
                        <table class="items-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Item</th>
                                    <th>Amount (Rs.)</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${watch("expenses")
                        .map(
                            (expense: any, index: number) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${itemMasterData?.find((m) => m.id === expense.item.toString())?.name || "N/A"}</td>
                                        <td>${expense.amount || 0}</td>
                                        <td>${expense.remarks || ""}</td>
                                    </tr>
                                `,
                        )
                        .join("")}
                            </tbody>
                            <tfoot>
                                <tr class="total-row">
                                    <td colspan="2" style="text-align: right;"><strong>Expenses Total:</strong></td>
                                    <td colspan="2"><strong>Rs. ${expensesTotal.toFixed(2)}</strong></td>
                                </tr>
                            </tfoot>
                        </table>

                        <div class="grand-total">
                            <p>Grand Total: Rs. ${(basicItemsTotal + expensesTotal).toFixed(2)}</p>
                        </div>
                    `
                    : ""
                }
                </div>
            </body>
            </html>
        `);
            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
            }, 1000);
        }
    };
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
                        <label>Customer Name</label>
                        <Controller
                            name="customer"
                            control={control}
                            rules={{ required: "Required" }}
                            render={({ field }) => (
                                <InputNumber
                                    placeholder="Enter Customer Name"
                                    className="w-full"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label>Current Kilometer</label>
                        <Controller
                            name="currentMileage"
                            control={control}
                            rules={{ required: "Required" }}
                            render={({ field }) => (
                                <InputNumber
                                    placeholder="Current Mileage"
                                    className="w-full"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label>Date</label>
                        <Controller
                            name="date"
                            control={control}
                            rules={{ required: "Required" }}
                            render={({ field }) => (
                                <DatePicker className="w-full" format="DD/MM/YYYY" {...field} />
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label>Driver Name</label>
                        <Controller
                            name="driverId"
                            control={control}
                            rules={{ required: "Required" }}
                            render={({ field }) => (
                                <Select
                                    placeholder="Select driver"
                                    className="w-full"
                                    options={
                                        driverData &&
                                        driverData?.map((driver) => ({
                                            label: driver.name,
                                            value: driver.id,
                                        }))
                                    }
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
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
                            rules={{ required: "Required" }}
                            render={({ field }) => (
                                <Select
                                    placeholder="Select truck"
                                    className="w-full"
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={
                                        truckData &&
                                        truckData?.map((truck) => ({
                                            label: truck.registration_number,
                                            value: truck.id,
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
                            rules={{ required: "Required" }}
                            render={({ field }) => <Input placeholder="From" {...field} />}
                        />
                    </div>
                    <div>
                        <label>To</label>
                        <Controller
                            name="to"
                            control={control}
                            rules={{ required: "Required" }}
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
                            pageSizeOptions: ["10", "20", "50", "100", "200"],
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`,
                            total: itemFields.length,
                            pageSize: 10,
                        }}
                        rowSelection={
                            itemFields.length > 0
                                ? {
                                    type: "checkbox" as const,
                                    onChange: (
                                        selectedRowKeys: React.Key[],
                                        selectedRows: any[],
                                    ) => {
                                        console.log(
                                            `selectedRowKeys: ${selectedRowKeys}`,
                                            "selectedRows: ",
                                            selectedRows,
                                        );
                                        setSelectedTripitems(selectedRows);
                                    },
                                    // onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
                                    //     console.log(record, selected, selectedRows);
                                    //     setSelectedTripExpenses(selectedRows);
                                    // },
                                }
                                : undefined
                        }
                        footer={() => (
                            <div className="flex justify-between gap-2">
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            appendItem({
                                                item: 0,
                                                weight: 0,
                                                tonageRate: 0,
                                                remarks: "",
                                            })
                                        }
                                    >
                                        Add Item
                                    </Button>
                                    <Button
                                        danger
                                        onClick={() => {
                                            if (itemFields.length > 0) {
                                                // removeItem(itemFields.length - 1);
                                                const selectedItemIds = selectedTripitems.map(
                                                    (item: any) => item.existingId,
                                                );

                                                if (selectedItemIds.length === 0) {
                                                    toast.error("Please select an item to delete");
                                                    return;
                                                }
                                                // Call the deleteTripDetail mutation
                                                deleteItem.mutateAsync(selectedItemIds);

                                                removeItem(
                                                    selectedTripitems.map((item: any) => item.id),
                                                );
                                                toast.success("Item removed successfully");
                                            }
                                        }}
                                    >
                                        Delete Item
                                    </Button>
                                </Space>

                                <div className="flex justify-end gap-2">
                                    <div className="text-lg font-bold">Total Amount:</div>
                                    <div className="text-lg font-bold">
                                        {itemFields.reduce(
                                            (acc, _item, index) => acc + renderTotal(index),
                                            0,
                                        )}
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
                            pageSizeOptions: ["10", "20", "50", "100", "200"],
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`,
                            total: expenseFields.length,
                            pageSize: 10,
                        }}
                        rowSelection={
                            expenseFields.length > 0
                                ? {
                                    type: "checkbox" as const,
                                    onChange: (
                                        selectedRowKeys: React.Key[],
                                        selectedRows: any[],
                                    ) => {
                                        console.log(
                                            `selectedRowKeys: ${selectedRowKeys}`,
                                            "selectedRows: ",
                                            selectedRows,
                                        );
                                        setSelectedTripExpenses(selectedRows);
                                    },
                                    // onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
                                    //     console.log(record, selected, selectedRows);
                                    //     setSelectedTripExpenses(selectedRows);
                                    // },
                                }
                                : undefined
                        }
                        footer={() => (
                            <div className="flex justify-between gap-2">
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            appendExpense({ item: 0, amount: 0, remarks: "" })
                                        }
                                    >
                                        Add Item
                                    </Button>
                                    <Button
                                        danger
                                        onClick={() => {
                                            if (expenseFields.length > 0) {
                                                console.log(
                                                    "selectedTripExpenses: ",
                                                    selectedTripExpenses,
                                                );
                                                const expenseIds = selectedTripExpenses.map(
                                                    (expense: any) => expense.existingId,
                                                );
                                                if (expenseIds.length === 0) {
                                                    toast.error("Please select an item to delete");
                                                    return;
                                                }
                                                deleteItem.mutateAsync(expenseIds);
                                                removeExpense(
                                                    selectedTripExpenses.map(
                                                        (expense: any) => expense.id,
                                                    ),
                                                );
                                                toast.success("Item removed successfully");
                                            }
                                        }}
                                    >
                                        Delete Item
                                    </Button>
                                </Space>
                                <div className="flex justify-end gap-2">
                                    <div className="text-lg font-bold">Total Expenses:</div>
                                    <div className="text-lg font-bold">
                                        {expenseFields.reduce(
                                            (acc, _item, index) =>
                                                acc + watch(`expenses.${index}.amount`) || 0,
                                            0,
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <Divider />
                <div className="flex justify-end gap-2 mt-4">
                    {/* Print Preview Or save as Pdf */}
                    <Button type="primary" onClick={handlePrintPreview}>
                        Print Preview
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TripModal;
