import type { ReactNode } from "react"
import styles from './Dropdown.module.css'
import { Link } from "react-router-dom";


interface DropdownProps {
    label: ReactNode;
    item?: { to?: string; label: string; child?: { label: string; to: string; }[] }[];
    isActive?: boolean;
}

export function Dropdown({ label, item, isActive }: DropdownProps) {
    return (
        <div className={`${styles.dropdownLabel} ${isActive ? styles.active : ""}`}>
            {label}
            <div className={styles.dropdown}>
                {item?.map((item) => {
                    if (item.to) {
                        return <Link key={item.label} className={styles.dropdownItem} to={item.to}>{item.label}</Link>
                    }
                    if (item.child) {
                        return (
                            <div key={item.label} className={styles.dropdownItem}>
                                <span>{item.label} &#128898;</span>
                                <div className={styles.dropdownSub}>
                                    {item.child.map((child) =>
                                        <Link key={child.label} className={styles.dropdownSubItem} to={child.to}>
                                            {child.label}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}