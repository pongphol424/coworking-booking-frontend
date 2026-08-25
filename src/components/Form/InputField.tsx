import type { InputHTMLAttributes } from "react"
import styles from "./InputField.module.css"


interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}


export function InputField({ label, error, name, ...inputProps }: InputFieldProps) {

    return (
        <>
            <div className={styles.fieldBox}>
                <label className={styles.label}>
                    {label}<br />
                    <input className={styles.field} name={name} {...inputProps}/>
                </label>
                {error && <span>{error}</span>}
            </div>
        </>
    )
}