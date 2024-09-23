import React, { useState, useCallback } from 'react';
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
    onSubmit: (values: { [key: string]: string | boolean | number | null }) => void;
    initialValues?: T;
}

const FormComponent = <T,>({ fields, onSubmit, initialValues }: FormProps<T>) => {
    const [formValues, setFormValues] = useState<{ [key: string]: string | boolean | number | null }>(initialValues || {});
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const { name, value, checked } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
        }));
    }, []);

    const validateField = (_name: string, value: string, validation?: ValidationRule) => {
        if (!validation) return null;
        if (validation.required && !value) return 'This field is required';
        if (validation.minLength && value.length < validation.minLength) return `Minimum length is ${validation.minLength}`;
        if (validation.maxLength && value.length > validation.maxLength) return `Maximum length is ${validation.maxLength}`;
        if (validation.pattern && !validation.pattern.test(value)) return 'Invalid format';
        if (validation.custom) return validation.custom(value);
        return null;
    };

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        const newErrors: { [key: string]: string | null } = {};
        fields.forEach((field) => {
            const error = validateField(field.name, String(formValues[field.name] || ''), field.validation);
            if (error) valid = false;
            newErrors[field.name] = error;
        });
        setErrors(newErrors);
        if (valid) onSubmit(formValues);
    }, [fields, formValues, onSubmit]);

    return (
        <div className="card-content">
            <form className="form-grid" onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.name} className="form-group">
                        <label htmlFor={field.name} className="form-label">
                            {field.label}
                        </label>
                        {field.type === 'radio' ? (
                            field.options?.map((option) => (
                                <div key={option.value} className="form-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name={field.name}
                                            value={option.value}
                                            checked={formValues[field.name] === option.value}
                                            onChange={(e) => handleChange(e, field.type)}
                                            className="form-input"
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
                                onChange={(e) => handleChange(e, field.type)}
                                className={`form-input ${errors[field.name] ? 'input-error' : ''}`}
                                defaultChecked={formValues[field.name] as unknown as boolean}
                                style={{
                                    padding: '0.75rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '1rem',
                                    backgroundColor: '#fff',
                                    color: '#333',
                                    outline: 'none',
                                    borderColor: errors[field.name] ? '#e74c3c' : '#ccc',
                                    width: ['checkbox', 'radio'].includes(field.type) ? '100%' : '',
                                    height: ['checkbox', 'radio'].includes(field.type) ? '1rem' : '',
                                }}
                            />
                        )}
                        {errors[field.name] && <span className="error-message">{errors[field.name]}</span>}
                    </div>
                ))}
            </form>
            <div className="card-footer">
                <button onClick={handleSubmit} className="submit-button">Submit</button>
            </div>
        </div>
    );
};

export default FormComponent;