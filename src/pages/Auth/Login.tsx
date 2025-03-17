
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "@/components/ui/loginForm";
import { useLogin, LoginProps } from "@/hooks/GetHooks";

// {"jwt":{"jwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QiLCJpYXQiOjE3MRI5YTU5My0iImV4cCI6MTczMjI2MTMyMSwiY3VzdG9tZXJfaWQiOiIxMDAxIiwidXNlcm5hbWUiOiJhcnZpbmRAMjAwMSJ9.TmVeJm4ufVET5ecgMseqnciZEaQGSLO-ZjEX_-xnoRg","customer_id":"1001","role":"user","login_id":"2","driver":null}}

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const loginMutation = useLogin();

    const handleLoginPromise = async (data: LoginProps) => {
        setLoading(true);
        try {
            await loginMutation.mutateAsync(data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            // Error handling is already done in the useLogin hook
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
