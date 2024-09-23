import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/warehouse')
    }, [navigate])
    return (
        <div>HomePage</div>
    )
}

export default HomePage