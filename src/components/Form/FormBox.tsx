import type { ReactNode } from "react"
import { Form } from "react-router-dom"
import styles from "./FormBox.module.css"

interface FormBoxProps {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    label: string;
    children: ReactNode;
}



export function FormBox ({method, label, children}: FormBoxProps){

    return(
        <Form method={method} className={styles.form}>
            <div className={styles.header}>{label}</div>
            {children}
        </Form>

    )
}