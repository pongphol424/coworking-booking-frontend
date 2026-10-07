import { Form, useLoaderData, useNavigate } from "react-router-dom"
import { InputField } from "../../Form/InputField"
import { InputMinMax } from "../../Form/InputMinMax"
import { Button } from "../../Button/Button"
import styles from './RoomTypeSearchForm.module.css'
import { CheckBox } from "../../Form/CheckBox"
import { facilityIds } from "../../../constants/facilities"
import { useEffect, useState } from "react"
import { SelectDropdown } from "../../Form/SelectDropdown"
import { RoomStatusIds } from "../../../constants/roomStatus"
import { DateRangeInput } from "../../Form/DateRangeInput"
import { TimeRangeInput } from "../../Form/TimeRangeInput"
import { Time } from "../../../constants/time"

interface RoomtypeSearchProps {
    id: number | undefined
    roomTypeName: string | undefined
    capacityMin: number | undefined
    capacityMax: number | undefined
    priceMin: number | undefined
    priceMax: number | undefined
    dateStart: string | undefined
    dateEnd: string | undefined
    timeStart: string | undefined
    timeEnd: string | undefined
    status: number | undefined
    facilityIds: number[]
}



export function RoomTypeSearchForm() {
    const loaderData = useLoaderData()
    const navigate = useNavigate();
    const [resetKey, setResetKey] = useState(0)
    const resetSearch = () => {
        navigate("/admin/room-types");
        setResetKey(prev=> prev + 1)
    }
    
    const [queryParams, setQueryParams] = useState<RoomtypeSearchProps>();

    useEffect(() => {
        setQueryParams(loaderData?.queryParams)
    }, [loaderData])
    return (
        <Form method="get" className={styles.form}>

            <div className={styles.row}>

                <div className={styles.item}>
                    <InputField
                        key={`id-${queryParams?.id}`}
                        label="ID"
                        name="id"
                        type="number"
                        defaultValue={queryParams?.id}
                    />
                </div>

                <div className={styles.item}>
                    <InputField
                        key={`name-${queryParams?.roomTypeName}`}
                        label="RoomType Name"
                        name="roomTypeName"
                        type="text"
                        defaultValue={queryParams?.roomTypeName}
                    />
                </div>

                <div className={styles.item}>
                    <InputMinMax
                        key={`capacity-${queryParams?.capacityMin}-${queryParams?.capacityMax}`}
                        label="Capacity"
                        name="capacity"
                        type="number"
                        defaultMin={queryParams?.capacityMin}
                        defaultMax={queryParams?.capacityMax}
                    />
                </div>

                <div className={styles.item}>
                    <InputMinMax
                        key={`price-${queryParams?.priceMin}-${queryParams?.priceMax}`}
                        label="Price"
                        name="price"
                        type="number"
                        defaultMin={queryParams?.priceMin}
                        defaultMax={queryParams?.priceMax}
                    />
                </div>

            </div>

            <div className={styles.row}>

                <div className={styles.item}>
                    <DateRangeInput
                        key={`date-${resetKey}`}
                        label="Date"
                        name="date"
                        defaultStartDate={queryParams?.dateStart}
                        defaultEndDate={queryParams?.dateEnd}
                    />
                </div>

                <div className={styles.item}>
                    <TimeRangeInput
                        key={`time-${queryParams?.timeStart}-${queryParams?.timeEnd}`}
                        label="Time"
                        placeholder="--:--"
                        options={Time}
                        defaultStartTime={queryParams?.timeStart}
                        defaultEndTime={queryParams?.timeEnd}
                    />
                </div>

                <div className={styles.item}>
                    <SelectDropdown
                        key={`status-${queryParams?.status}`}
                        label="Status"
                        name="status"
                        placeholder="-- Status --"
                        defaultValue={queryParams?.status?.toString()}
                        options={RoomStatusIds}>
                    </SelectDropdown>
                </div>

            </div>

            <CheckBox label="Facility" name="facilityIds" checkList={facilityIds} checkedIds={queryParams?.facilityIds ?? []} />

            <div className="button">
                <Button buttonstyle="submit" type="submit">Search</Button>
                <Button buttonstyle="cancel" type="reset" onClick={resetSearch}>Reset</Button>
            </div>
        </Form>
    )
}