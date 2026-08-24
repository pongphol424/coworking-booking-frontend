import type { ReactNode } from "react";
import styles from './NavItem.module.css'
import { Link } from "react-router-dom";


interface NavItemProps{
    children: ReactNode;
    to?: string;
    onClick?: () => void;
    isActive?: boolean;
}

export function NavItem({children, to, onClick, isActive} :NavItemProps){
    const className = `${styles.navItem} ${isActive ? styles.active : ""}`
    
    if(to){
        return <Link className={className} to={to}>{children}</Link>
    }
    
    return <button className={className} onClick={onClick}>{children}</button>
}