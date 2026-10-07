import { type SelectHTMLAttributes } from "react";
import styles from './TimeRangeInput.module.css'


interface TimeRangeProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    options: { name: string, id: string }[]
    placeholder: string
    defaultStartTime: string | undefined
    defaultEndTime: string | undefined
}



export function TimeRangeInput({ label, options, placeholder, defaultStartTime, defaultEndTime, ...selectProps }: TimeRangeProps) {

    return (
        <div className={styles.box}>
                {label}
                <br />
                <div className={styles.item}>

                    <select name="timeStart" className={styles.timeInput} defaultValue={defaultStartTime} {...selectProps}>
                        <option value="">{placeholder}</option>
                        {options.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                    ~

                    <select name="timeEnd" className={styles.timeInput} defaultValue={defaultEndTime} {...selectProps}>
                        <option value="">{placeholder}</option>
                        {options.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                </div>
        </div>
    )
}