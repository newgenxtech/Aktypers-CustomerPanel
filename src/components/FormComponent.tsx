import React, { useState } from 'react';
import '@/styles/FormComponent.css';
interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null; // Custom validation returns error message or null
}

interface InputField {
    name: string;
    label: string;
    type: string; // e.g., 'text', 'email', 'password', 'number', etc.
    placeholder?: string;
    validation?: ValidationRule;
    options?: { label: string; value: string }[];
}

interface FormProps<T> {
    fields: InputField[];
    onSubmit: (values: {
        [key: string]:
        string | boolean | number | null
    }) => void;
    initialValues?: T
}

const FormComponent = <T,>({ fields, onSubmit, initialValues }: FormProps<T>) => {
    const [formValues, setFormValues] = useState<{
        [key: string]:
        string | boolean | number | null;
    }>(initialValues || {});
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const { name, value, checked } = e.target;
        console.log(name, value, checked);

        setFormValues({
            ...formValues, [name]:
                type === 'checkbox' ? checked : value
        });
    };

    const validateField = (name: string, value: string, validation?: ValidationRule) => {
        if (!validation) return null;

        if (validation.required && !value) {
            return 'This field is required';
        }
        if (validation.minLength && value.length < validation.minLength) {
            return `Minimum length is ${validation.minLength}`;
        }
        if (validation.maxLength && value.length > validation.maxLength) {
            return `Maximum length is ${validation.maxLength}`;
        }
        if (validation.pattern && !validation.pattern.test(value)) {
            return 'Invalid format';
        }
        if (validation.custom) {
            return validation.custom(value);
        }
        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        const newErrors: { [key: string]: string | null } = {};
        fields.forEach((field) => {
            const error = validateField(field.name, String(formValues[field.name] || ''), field.validation);
            if (error) valid = false;
            newErrors[field.name] = error;
        });

        setErrors(newErrors);

        if (valid) {
            onSubmit(formValues);
        }
    };

    return (
        <form
            className="form"
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '2rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div
                className="form-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                }}
            >
                {fields.map((field) => (
                    <div key={field.name} className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor={field.name} style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                            {field.label}
                        </label>

                        {field.type === 'radio' ? (
                            field.options?.map((option) => (
                                <div key={option.value} className="form-group" >
                                    <label>
                                        <input
                                            type="radio"
                                            name={field.name}
                                            value={option.value}
                                            checked={formValues[field.name] === option.value}
                                            onChange={
                                                (e) => handleChange(e, field.type)
                                            }
                                            style={{
                                                marginRight: '0.5rem',
                                            }}
                                        />
                                        {option.label}
                                    </label>
                                </div>
                            ))

                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={String(formValues[field.name]) || ''}
                                onChange={
                                    (e) => handleChange(e, field.type)
                                }
                                className={`form-input ${errors[field.name] ? 'input-error' : ''}`}
                                defaultChecked={formValues[field.name] as unknown as boolean}
                                // defaultValue={formValues[field.name] as unknown as string}
                                style={{
                                    padding: '0.75rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '1rem',
                                    backgroundColor: '#fff',
                                    color: '#333',
                                    borderColor: errors[field.name] ? '#e74c3c' : '#ccc',
                                    width: ['checkbox', 'radio'].includes(field.type) ? '100%' : '',
                                    height: ['checkbox', 'radio'].includes(field.type) ? '1rem' : '',
                                }}
                            />
                        )}
                        {errors[field.name] && (
                            <span className="error-message" style={{ color: '#e74c3c', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                {errors[field.name]}
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <button
                type="submit"
                className="submit-button"
                style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#3498db',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2980b9')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3498db')}
            >
                Submit
            </button>
        </form>
    );
};

export default FormComponent;
