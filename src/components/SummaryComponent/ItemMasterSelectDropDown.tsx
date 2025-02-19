import React, { useRef, useState } from 'react';
import { Button, Divider, Input, Select, Space } from 'antd';
import type { InputRef, SelectProps } from 'antd';
import { Plus } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';
import { useCreateItem } from '@/hooks/GetHooks';
import toast from 'react-hot-toast';

interface ItemMasterSelectDropDownProps extends Omit<SelectProps, keyof ControllerRenderProps>, ControllerRenderProps {
    itemMasterData: {
        id: number;
        name: string;
        customer: number;
    }[];
    itemMasterLoading: boolean;
}

const ItemMasterSelectDropDown: React.FC<ItemMasterSelectDropDownProps> = ({
    itemMasterData,
    itemMasterLoading,
    value,
    ...props
}) => {
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const {
        mutate: createItem,
    } = useCreateItem();

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        toast.loading('Adding item...', {
            duration: 2000,
            id: 'addItem'
        });
        createItem([{
            customer: localStorage.getItem("customer_id") || "",
            name: name
        }]);
    };

    const selectedItem = itemMasterData.find(item => item.id === value.toString());
    console.log("selectedItem", selectedItem)
    return (
        <Select
            {...props}
            style={{ width: 300 }}
            value={value ? { label: selectedItem?.name || 'Unknown', value: value } : undefined}
            loading={itemMasterLoading}
            placeholder="custom dropdown render"
            showSearch
            labelRender={(value) => {
                console.log(value);
                return value.label || 'Please select';
            }}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button type="text" icon={<Plus />} onClick={addItem}>
                            Add item
                        </Button>
                    </Space>
                </>
            )}
            options={itemMasterData.map((item) => ({ label: item.name, value: item.id }))}
        />
    );
};

export default ItemMasterSelectDropDown;