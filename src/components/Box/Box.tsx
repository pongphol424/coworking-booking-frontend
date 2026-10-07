import type { ReactNode } from "react"
import styles from "./Box.module.css"
import { Link } from "react-router-dom";

interface BoxProps {
    children: ReactNode;
    to?: string
}


export function Box({ children, to }: BoxProps) {
    if (to) {
        return (
            <Link to={to} className={styles.boxLink} >
                <div className={styles.box}>
                    {children}
                </div>
            </Link>
        )
    }
    return <div className={styles.box}>{children}</div>
}