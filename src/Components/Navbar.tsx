import { Link, NavLink } from "react-router-dom";




export function Navbar(){

    return(
        <>
        <div style={{display:"flex"}}>
            <Link to="/"><button>Home</button></Link>
            <Link to="/register"><button>Register</button></Link>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/profile"><button>User</button></Link>
        </div>
        </>
    )
}