import { useState, ChangeEvent } from 'react';
import '@/styles/CustomFormComponent.css';
import { DialogClose } from '@radix-ui/react-dialog';
interface Validation {
    required: boolean;
    minLength: number;
    maxLength: number;
    pattern: RegExp;
    custom: (value: string) => string | null;
}

interface FormData {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    validation: Validation;
    options: { label: string; value: string }[];
}

const CustomFormComponent = (
    {
        onSubmit,
    }: {
        onSubmit: (data: FormData) => void;
    }
) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        label: '',
        type: 'text',
        placeholder: '',
        validation: {
            required: false,
            minLength: 0,
            maxLength: 0,
            pattern: /.*/,
            custom: () => null
        },
        options: []
    });



    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleValidationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            validation: {
                ...formData.validation,
                [name]: type === 'checkbox' ? checked : value
            }
        });
    };

    const handleOptionsChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newOptions = [...formData.options];
        newOptions[index] = { label: e.target.value, value: e.target.value };
        setFormData({
            ...formData,
            options: newOptions
        });
    };



    const addOption = () => {
        setFormData({
            ...formData,
            options: [...formData.options, { label: '', value: '' }]
        });
    };

    const removeOption = (index: number) => {
        const newOptions = formData.options.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            options: newOptions
        });
    };

    // const handleSubmit = (e: { preventDefault: () => void; }) => {
    //     e.preventDefault();
    //     onSubmit(formData);
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform validation
        const { name, label, type, placeholder, validation, options } = formData;

        console.log(formData);

        if (!name || !label || !type || !placeholder) {
            alert('All fields are required');
            return;
        }
        if (validation.required && name.length < validation.minLength) {
            alert(`Name must be at least ${validation.minLength} characters`);
            return;
        }
        if (validation.required && name.length > validation.maxLength) {
            alert(`Name must be less than ${validation.maxLength} characters`);
            return;
        }
        if (validation.required && !validation.pattern.test(name)) {
            alert('Name does not match the pattern');
            return;
        }

        if ((type === 'radio' || type === 'checkbox' || type === 'select') && options.length === 0) {
            alert('At least one option is required');
            return;
        }

        onSubmit(formData);


        // If validation passes, close the dialog
    };

    return (
        <form className="form-container">
            <div className="full-width">
                <label className="label">Label:</label>
                <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    className="input"
                />

            </div>

            <div>
                <label className="label">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                />
            </div>

            <div>
                <label className="label">Type:</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="select"
                >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="password">Password</option>
                    <option value="number">Number</option>
                    <option value="textarea">Textarea</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="select">Select</option>
                </select>
            </div>

            <div>
                <label className="label">Placeholder:</label>
                <input
                    type="text"
                    name="placeholder"
                    value={formData.placeholder}
                    onChange={handleChange}
                    className="input"
                />
            </div>

            <div className="full-width">
                <label className="label">Validation:</label>
                <div className="validation-container">
                    <div className='checkbox-container'>
                        <label className="label">Required:</label>
                        <input
                            type="checkbox"
                            name="required"
                            checked={formData.validation.required}
                            onChange={handleValidationChange}
                        />
                    </div>
                    {
                        formData.validation.required && (
                            <>
                                <div>
                                    <label className="label">Min Length:</label>
                                    <input
                                        type="number"
                                        name="minLength"
                                        value={formData.validation.minLength}
                                        onChange={handleValidationChange}
                                        className="input" />
                                </div><div>
                                    <label className="label">Max Length:</label>
                                    <input
                                        type="number"
                                        name="maxLength"
                                        value={formData.validation.maxLength}
                                        onChange={handleValidationChange}
                                        className="input" />
                                </div><div>
                                    <label className="label">Pattern:</label>
                                    <input
                                        type="text"
                                        name="pattern"
                                        value={formData.validation.pattern.source}
                                        onChange={handleValidationChange}
                                        className="input" />
                                </div>
                                {/* <div className="full-width">
                                    <label className="label">Custom:</label>
                                    <input
                                        type="text"
                                        name="custom"
                                        value={formData.validation.custom.toString()}
                                        onChange={handleValidationChange}
                                        className="input" />
                                </div> */}
                            </>

                        )


                    }
                </div>
            </div>

            {
                (formData.type === 'radio' || formData.type === 'checkbox' || formData.type === 'select') && (
                    <>
                        <label className="label">Options:</label>
                        <div className="options-container">
                            {formData.options.map((option, index) => (
                                <div key={index} className="option-container">
                                    <input
                                        type="text"
                                        value={option.value}
                                        onChange={(e) => handleOptionsChange(e, index)}
                                        className="option-input"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        className="option-button"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addOption}
                            className="option-button"
                            style={{
                                marginTop: '12px',
                                marginLeft: '0px'
                            }}
                        >
                            Add Option
                        </button>
                    </>
                )
            }
            <DialogClose
                asChild
            >
                <button className="submit-button"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </DialogClose>
        </form >

    );
};

export default CustomFormComponent;