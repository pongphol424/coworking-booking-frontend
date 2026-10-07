import type { InputHTMLAttributes } from "react"
import styles from './InputMinMax.module.css'


interface InputMixMaxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    defaultMin: number | undefined
    defaultMax: number | undefined
}


export function InputMinMax({ label, defaultMin, defaultMax, name, ...inputProps }: InputMixMaxProps) {
    return (
        <div className={styles.box}>

            <label className={styles.label}>{label}
                <div className={styles.item}>
                    <input key={`min-${name}`} className={styles.field} name={`${name}Min`} placeholder="Min" defaultValue={defaultMin} {...inputProps} />
                    <div> ~ </div>
                    <input key={`max-${name}`} className={styles.field} name={`${name}Max`} placeholder="Max" defaultValue={defaultMax} {...inputProps} />
                </div>
            </label>
        </div>
    )
}