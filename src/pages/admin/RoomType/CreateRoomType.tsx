import { useActionData } from "react-router-dom";
import { FormBox } from "../../../components/Form/FormBox";
import { InputField } from "../../../components/Form/InputField";
import { BoxEror } from "../../../components/Box/BoxError";
import { Button } from "../../../components/Button/Button";
import { CheckBox } from "../../../components/Form/CheckBox";
import { facilityIds } from "../../../constants/facilities";
import { useEffect, useState } from "react";

interface CreateRoomTypeFormErrors {
    roomTypeName?: string
    capacity?: string
    price?: string
    description?: string
    message?: string
}


export function CreateRoomType() {
    let actionData = useActionData<CreateRoomTypeFormErrors | null>()
    const [ roomTypeErrors, setRoomTypeErrors] = useState<CreateRoomTypeFormErrors | null>()
    useEffect(()=>{
        setRoomTypeErrors(actionData)
    },[actionData])

    return (
        <>
            <FormBox label="Create Room Type" method="post">

                <InputField
                    label="Room Type Name"
                    name="name"
                    type="text"
                    error={roomTypeErrors?.roomTypeName}
                    required />

                <InputField
                    label="Capacity"
                    name="capacity"
                    type="number"
                    error={roomTypeErrors?.capacity}
                    required />

                <InputField
                    label="Price"
                    name="price"
                    type="number"
                    error={roomTypeErrors?.price}
                    required />

                <CheckBox label="Facility" name="facilityIds" checkList={facilityIds} />

                <div>
                    <span style={{fontWeight:"bold"}}>Description</span>
                    <br />
                    <textarea name="description" rows={6} style={{width:"70%"}}></textarea >
                    {roomTypeErrors?.description &&
                        <span style={{ position: "fixed", color: "red" }}> {roomTypeErrors.description}</span>}
                </div>
                <Button buttonstyle="submit" type="submit">Submit</Button>
            </FormBox>
            <BoxEror error={roomTypeErrors?.message} />
        </>
    )
}