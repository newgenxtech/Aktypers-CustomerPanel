import React, { useRef, useState } from 'react';
import { Button, Divider, Input, Select, Space } from 'antd';
import type { InputRef, SelectProps } from 'antd';
import { Plus } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

let index = 0;
interface ItemMasterSelectDropDownProps extends Omit<SelectProps, keyof ControllerRenderProps>, ControllerRenderProps {
    itemMasterData: {
        name: string;
        customer: number;
    }[];
    itemMasterLoading: boolean;
}

const ItemMasterSelectDropDown: React.FC<ItemMasterSelectDropDownProps> = ({
    itemMasterData,
    itemMasterLoading,
    ...props
}) => {
    const [items, setItems] = useState(['jack', 'lucy']);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    return (
        <Select
            {...props}
            style={{ width: 300 }}
            loading={itemMasterLoading}
            placeholder="custom dropdown render"
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
            options={itemMasterData.map((item) => ({ label: item.name, value: item.name }))}
        />
    );
};

export default ItemMasterSelectDropDown;