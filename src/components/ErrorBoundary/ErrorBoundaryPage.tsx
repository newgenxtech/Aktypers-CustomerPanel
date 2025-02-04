import React from 'react';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/hooks/queryClient';
import { useNavigate } from 'react-router-dom';

const ErrorBoundaryPage: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('customer_id');
        localStorage.removeItem('jwt');
        localStorage.removeItem('login_id');
        localStorage.removeItem('role');
        window.location.href = '/auth/login';
        queryClient.clear();
    };

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-6xl font-bold text-gray-900">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
                    <p className="text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
                </div>
                
                <div className="space-y-3">
                    <Button 
                        onClick={handleRedirect}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5"
                    >
                        Return Home
                    </Button>
                    <Button
                        onClick={handleLogout}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorBoundaryPage;