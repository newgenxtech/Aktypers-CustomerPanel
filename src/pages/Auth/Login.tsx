
import { PostApiResponse } from "@/Interfaces/interface";
import { routes } from "@/routes/routes";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { message } from "antd";

interface LoginProps {
    email: string;
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
    const [messageApi, contextHolder] = message.useMessage();
    const showToast = (variant: "default" | "destructive", title: string, description: string) => {
        // toast({
        //     variant,
        //     duration: 2000,
        //     title,
        //     description,
        //     className: cn('top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'),
        // });
        messageApi.success(description);

    };

    const handleLoginPromise = async (data: LoginProps) => {
        setLoading(true);
        try {
            const response = await axios.post(routes.backend.auth.login, data);
            const responseJson: LoginResponse = response.data;

            if (responseJson.statusCode === 200) {
                const responseData = Array.isArray(responseJson.data) ? responseJson.data[0] : responseJson.data;
                localStorage.setItem('Fl_AccessToken', responseData.accessToken);
                localStorage.setItem('Fl_RefreshToken', responseData.refreshToken);
                localStorage.setItem('Fl_User', JSON.stringify(responseData.userdetials));

                showToast("default", "Login Successful", responseJson.message);

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                showToast("destructive", "Login Failed", responseJson.message);
            }
        } catch (error) {
            console.error('Error:', error);
            if (axios.isAxiosError(error) && error.response) {
                showToast("destructive", "Login Failed", error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            {contextHolder}
            <LoginForm
                onLogin={handleLoginPromise}
                loading={loading}
                setLoading={setLoading}
            />
        </main>
    );
}
