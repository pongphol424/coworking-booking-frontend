import { useAuth } from "../../context/auth.context";
import { useState } from "react";
import styles from './Navbar.module.css'
import { NavItem } from "./NavItem";
import { Dropdown } from "./Dropdown";



export function Navbar() {
    const { email, isAdmin, logout } = useAuth()
    const [isActive, setIsActive] = useState(false)
    const handleIsActive = () => {
        setIsActive(!isActive)
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.hamburger} onClick={handleIsActive}>&#9776;</div>
            <NavItem to="/" isActive={isActive} >Home</NavItem>
            {email ?
                <>
                    {isAdmin &&
                        <Dropdown
                            isActive={isActive}
                            label="Back Office &#9662;"
                            item={[
                                {
                                    label: "RoomType",
                                    child: [
                                        { label: "Create RoomType", to: "/admin/room-types/new" },
                                        { label: "RoomType Management", to: "/admin/room-types" },
                                    ]
                                }
                            ]}
                        />
                    }
                    <NavItem to="/profile" isActive={isActive} >{`${email.length > 8 ? `${email.slice(0, 8)}...` : email}`}</NavItem>
                    <NavItem onClick={logout} isActive={isActive} >Logout</NavItem>
                </>
                :
                <>
                    <NavItem to="/login" isActive={isActive} >Login</NavItem>
                    <NavItem to="/register" isActive={isActive} >Register</NavItem>
                </>
            }
        </div>
    )
}