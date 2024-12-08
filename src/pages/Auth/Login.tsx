
import { routes } from "@/routes/routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { message } from "antd";
import LoginForm from "@/components/ui/loginForm";

interface LoginProps {
    username: string;
    password: string;
}

interface LoginResponse {
    jwt: {
        jwt: string;
        customer_id: string;
        role: string;
        login_id: string;
        driver: null;
    }
}

// {
//     "jwt": {
//         "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QiLCJpYXQiOjE3MzIyNTc3MjEsImV4cCI6MTczMjI2MTMyMSwiY3VzdG9tZXJfaWQiOiIxMDAxIiwidXNlcm5hbWUiOiJhcnZpbmRAMjAwMSJ9.TmVeJm4ufVET5ecgMseqnciZEaQGSLO-ZjEX_-xnoRg",
//         "customer_id": "1001",
//         "role": "user",
//         "login_id": "2",
//         "driver": null
//     }
// }

export default function Login() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLoginPromise = async (data: LoginProps) => {
        setLoading(true);
        try {
            const response = await axios.post(routes.backend.auth.login, data);
            const responseJson: LoginResponse = response.data;

            if (responseJson.jwt.jwt) {

                if (responseJson.jwt.role !== 'user' && responseJson.jwt.customer_id !== '' && responseJson.jwt.customer_id !== null) {
                    message.error("You are not authorized to login");
                    return;
                }

                message.success("Login Successful");
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
                // showToast("destructive", "Login Failed", error.response.data.message);
                message.error(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <LoginForm
                onLogin={handleLoginPromise}
                loading={loading}
                setLoading={setLoading}
            />
        </main>
    );
}
