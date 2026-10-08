import { useState } from "react"
import { facilityIds } from "../../constants/facilities"
import type { CreateRoomTypeFormErrors } from "../../constants/roomType"
import { BoxEror } from "../Box/BoxError"
import { Button } from "../Button/Button"
import { CheckBox } from "../Form/CheckBox"
import { FormBox } from "../Form/FormBox"
import { InputField } from "../Form/InputField"


interface RoomTypeFormProps {
    label?: string | undefined
    method: 'get' | 'post' | 'put' | 'patch' | 'delete'
    defaultValues?: {
        name: string,
        capacity: number,
        price: number,
        facility: number[]
        description: string | null
    }
    errors?: CreateRoomTypeFormErrors
}


export function RoomTypeForm({ method, label, defaultValues, errors }: RoomTypeFormProps) {
    const [isDisabled, setIsDisabled] = useState(true);
    const handleDisabled = () => {
        setIsDisabled(!isDisabled);
    }

    return (
        <>
            <FormBox label={label} method={method}>

                <InputField
                    label="Room Type Name"
                    name="name"
                    type="text"
                    defaultValue={defaultValues?.name}
                    autoComplete="off"
                    error={errors?.roomTypeName}
                    disabled={isDisabled}
                    required />

                <InputField
                    label="Capacity"
                    name="capacity"
                    type="number"
                    defaultValue={defaultValues?.capacity}
                    error={errors?.capacity}
                    disabled={isDisabled}
                    required />

                <InputField
                    label="Price"
                    name="price"
                    type="number"
                    defaultValue={defaultValues?.price}
                    error={errors?.price}
                    disabled={isDisabled}
                    required />

                <CheckBox label="Facility" checkedIds={defaultValues?.facility} name="facilityIds" checkList={facilityIds} disabled={isDisabled}/>
                <div>
                    <span style={{ fontWeight: "bold" }}>Description</span>
                    <br />
                    <textarea name="description" defaultValue={defaultValues?.description ? defaultValues.description : ""} rows={6} style={{ width: "70%" }}></textarea >
                    {errors?.description &&
                        <span style={{ position: "fixed", color: "red" }}> {errors.description}</span>}
                </div>
                {method === "post" ?
                    <Button buttonstyle="submit" type="submit">Submit</Button>
                    :
                    !isDisabled ?
                        <div>
                            <Button buttonstyle="submit" type="submit">Save</Button>
                            <Button buttonstyle="cancel" type="button" onClick={handleDisabled}>Cancel</Button>
                        </div>
                        :
                        <Button buttonstyle="button" type="button" onClick={handleDisabled}>Edit</Button>
                }

            </FormBox>
            <BoxEror error={errors?.message} />
        </>
    )
}