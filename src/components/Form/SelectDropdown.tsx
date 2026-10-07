import { type SelectHTMLAttributes } from "react"
import styles from "./SelectDropdown.module.css"

interface SelectDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    options: { name: string, id: string}[]
    placeholder: string
}


export function SelectDropdown({ options, label, placeholder, ...selectProps }: SelectDropdownProps) {
    return (
        <div className={styles.box}>

            <label className={styles.label}>
                {label}
                <br />

                <select className={styles.select} {...selectProps}>
                    <option value="">{placeholder}</option>
                    {options.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                
            </label>
        </div>
    )
}