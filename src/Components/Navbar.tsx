import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";




export function Navbar() {
    const { email, logout } = useAuth()
    return (
        <>
            <div style={{ display: "flex" }}>
                <Link to="/"><button>Home</button></Link>
                {email ? 
                <>
                    <Link to="/profile"><button>{email}</button></Link>
                    <button onClick={logout}>Logout</button>
                </>
                :
                <>
                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/register"><button>Register</button></Link>
                </>
                }
            </div>
        </>
    )
}