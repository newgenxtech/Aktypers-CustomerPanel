import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/ErrorPage.css';

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className="error-page">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button onClick={handleRedirect}>Go to Home Page</button>
        </div>
    );
};

export default ErrorPage;