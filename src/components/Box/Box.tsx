import type { ReactNode } from "react"
import styles from "./Box.module.css"
import { Link } from "react-router-dom";

interface BoxProps {
    children: ReactNode;
    to?: string
    state?: {
        from: string
    }
}


export function Box({ children, to, state }: BoxProps) {
    if (to) {
        return (
            <Link to={to} className={styles.boxLink} state={state} >
                <div className={styles.box}>
                    {children}
                </div>
            </Link>
        )
    }
    return <div className={styles.box}>{children}</div>
}