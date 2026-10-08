import { useActionData } from "react-router-dom";
import type { CreateRoomTypeFormErrors } from "../../../constants/roomType";
import { RoomTypeForm } from "../../../components/RoomType/RoomTypeForm";




export function CreateRoomType() {
    const actionData = useActionData<CreateRoomTypeFormErrors | undefined>()

    return (
        <>
            <RoomTypeForm label="Create Room Type" method="post" errors={actionData}></RoomTypeForm>
        </>
    )
}