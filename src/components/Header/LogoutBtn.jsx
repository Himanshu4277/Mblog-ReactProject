import { logout } from "../../features/authSlice"
import { useDispatch } from "react-redux"
import AuthServices from "../../Appwrite/Auth"

const LogoutBtn = () => {
    const dispatch = useDispatch()
    
    const handleLogout = () => {
        AuthServices.logout().then(() => { dispatch(logout()) })

    }

    return (
        <div>
            <button className="bg-blue-500 text-white rounded p-2 " onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default LogoutBtn
