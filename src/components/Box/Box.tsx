import type { ReactNode } from "react"
import styles from "./Box.module.css"

interface BoxProps{
    children: ReactNode;
}


export function Box({children}:BoxProps){
    return  <div className={styles.box}>{children}</div>
}