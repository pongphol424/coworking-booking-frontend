import { type ReactNode } from "react"
import styles from "./SearchBar.module.css"

interface SearchBarProps {
    label: string
    children: ReactNode
}


export function SearchBar({ label, children }: SearchBarProps) {

    return (
        <>
            <div className={styles.searchBar}>
                <div className={styles.label}>{label}</div>
                {children}
            </div>
        </>
    )
}