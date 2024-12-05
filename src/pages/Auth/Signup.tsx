import { routes } from "@/routes/routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { message } from "antd";
import SignupForm from "@/components/ui/SignupForm";

interface SignupProps {
    username: string;
    password: string;
    email: string;
}

interface SignupResponse {
    jwt: {
        jwt: string;
        customer_id: string;
        role: string;
        login_id: string;
        driver: null;
    }
}

export default function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignupPromise = async (data: SignupProps) => {
        setLoading(true);
        try {
            const response = await axios.post(routes.backend.auth.signup, data);
            const responseJson: SignupResponse = response.data;

            if (responseJson.jwt.jwt) {
                message.success("Signup Successful");
                localStorage.setItem('jwt', responseJson.jwt.jwt);
                localStorage.setItem('customer_id', responseJson.jwt.customer_id);
                localStorage.setItem('role', responseJson.jwt.role);
                localStorage.setItem('login_id', responseJson.jwt.login_id);
                if (responseJson.jwt.driver !== null) {
                    localStorage.setItem('driver', responseJson.jwt.driver);
                }
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error:', error);
            if (axios.isAxiosError(error) && error.response) {
                message.error(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <SignupForm
                onSignup={handleSignupPromise}
                loading={loading}
                setLoading={setLoading}
            />
        </main>
    );
}