import FormComponent, { InputField } from "@/components/FormComponent";
import { WareHouseData, WarehouseDataStoreInterface } from "@/Interfaces/interface";
import { updateWarehouse } from "@/services/warehouse/WarehouseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import '@/styles/WarehouseDetailPage.css';
import { useEffect, useState } from "react";

const initialFields: InputField[] = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter Warehouse name',
        validation: { required: true, minLength: 3, maxLength: 20 },
    },
    {
        name: 'code',
        label: 'Code',
        type: 'text',
        placeholder: 'Enter Warehouse code',
        validation: { required: true, minLength: 3, maxLength: 10 },
    },
    {
        name: 'city',
        label: 'City',
        type: 'text',
        placeholder: 'Enter City name',
        validation: { required: true, minLength: 3, maxLength: 20 },
    },
    {
        name: 'space_available',
        label: 'Available Space',
        type: 'number',
        placeholder: 'Enter Available Space',
        validation: { required: true, minLength: 1, maxLength: 10 },
    },
    {
        name: 'type',
        label: 'Type',
        type: 'text',
        placeholder: 'Enter Warehouse type',
        validation: { required: true, minLength: 3, maxLength: 20 },
    },
    {
        name: 'cluster',
        label: 'Cluster',
        type: 'text',
        placeholder: 'Enter Warehouse cluster',
        validation: { required: true, minLength: 3, maxLength: 20 },
    },
    {
        name: 'is_registered',
        label: 'Is Registered',
        type: 'checkbox',
    },
    {
        name: 'is_live',
        label: 'Is Live',
        type: 'checkbox',
    },
]
const WarehouseDetailPage = () => {
    // get code value from prams


    const { code } = useParams();

    console.log(code);

    const props = useSelector((state: { warehouse: WarehouseDataStoreInterface }) => state.warehouse.data);
    const propsData = props.find((item) => item.code === code);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fields, setFields] = useState(initialFields);

    const handleSubmit = (values: {
        [key: string]:
        string | boolean | number | null
    }) => {
        console.log('Form Submitted:', values);
        dispatch(updateWarehouse(values));
        navigate('/warehouse');
    };
    useEffect(() => {
        if (propsData) {
            const customItems = propsData.customItems || [];
            const newFields = customItems.map((item) => ({
                name: item.name,
                label: item.label,
                type: item.type,
                placeholder: item.placeholder,
                validation: item.validation,
                options: item.options,
            }));
            setFields([...initialFields, ...newFields]);
        }
    }, [propsData]);

    return (
        <div className="
        container-fluid
        ">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Warehouse Details</h2>
                    <p className="card-description">Fill in the details of the warehouse</p>
                </div>
                <FormComponent<WareHouseData>
                    fields={fields}
                    onSubmit={handleSubmit}
                    initialValues={propsData}
                    setFields={setFields} // Pass setFields to the form for dynamic updates
                />
            </div>
        </div>

    );
}

export default WarehouseDetailPage