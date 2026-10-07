import { useEffect, useState } from "react";
import styles from "./DateRangeInput.module.css"
import DatePicker from "react-datepicker";

interface DateRangeProps {
    label: string
    name: string
    defaultStartDate: string | undefined
    defaultEndDate: string | undefined
}

export function DateRangeInput({ label, name, defaultStartDate, defaultEndDate }: DateRangeProps) {
    const [startDate, setStartDate] = useState<Date | null>()
    const [EndDate, setEndDate] = useState<Date | null>()

    const onChangeStartDate = (date: Date | null) => {
        if (date) {
            setStartDate(date)
        }
    }
    const onChangeEndDate = (date: Date | null) => {
        if (date) {
            setEndDate(date)
        }
    }

    useEffect(()=>{
        setStartDate(null)
        setEndDate(null)
        if(defaultStartDate){
            const [day, month, year] = defaultStartDate.split("/").map(Number)
            const startDate = new Date(year, month-1, day)
            setStartDate(startDate)
        }
        if(defaultEndDate){
            const [day, month, year] = defaultEndDate.split("/").map(Number)
            const endDate = new Date(year, month-1, day)
            setEndDate(endDate)
        }
    },[defaultStartDate,defaultEndDate])

    return (
        <div className={styles.box}>
            {label}
            <div className={styles.item}>
                <DatePicker
                    name={`${name}Start`}
                    className={styles.dateInput}
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={onChangeStartDate}
                    autoComplete="off"
                />
                ~
                <DatePicker
                    name={`${name}End`}
                    className={styles.dateInput}
                    selected={EndDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={onChangeEndDate}
                    autoComplete="off"
                />
            </div>

        </div>
    )
}