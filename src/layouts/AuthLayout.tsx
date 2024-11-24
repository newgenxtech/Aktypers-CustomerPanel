import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    if (localStorage.getItem('jwt')) {
        window.location.href = '/dashboard';
    }
    return (
        <>
            <Outlet />
        </>
    )
}

export default AuthLayout