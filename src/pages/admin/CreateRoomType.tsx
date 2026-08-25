import { useActionData, type ActionFunctionArgs } from "react-router-dom";
import { api } from "../../api/axios";
import { validate } from "../../service/validate";
import { CreateRoomTypeSchema, type RoomTypeCreateDto } from "../../schema/roomtype.schema";
import { TransformError } from "../../utils/transformErrors";
import { FormBox } from "../../components/Form/FormBox";
import { InputField } from "../../components/Form/InputField";
import { BoxEror } from "../../components/Box/BoxError";
import { Button } from "../../components/Button/Button";
import { CheckBox } from "../../components/Form/CheckBox";

interface CreateRoomTypeFormErrors {
    roomTypeName?: string
    capacity?: string
    price?: string
    description?: string
    message?: string
}

export async function createRoomtypeAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const body: RoomTypeCreateDto = {
        name: String(formData.get("roomTypeName")),
        capacity: Number(formData.get("capacity")),
        price: Number(formData.get("price")),
        description: String(formData.get("description")),
        facilityIds: formData.getAll("facilities").map(id => Number(id))
    }
    try {
        await validate(CreateRoomTypeSchema, body)
        await api.post('/admin/room-types', body)
        alert('Create room type complete')
    } catch (error: any) {
        return TransformError(error)
    }
}


export function CreateRoomType() {
    const facilities = [
        { id: 1, name: "TV" },
        { id: 2, name: "Projector" },
        { id: 3, name: "Speaker" },
        { id: 4, name: "White board" }
    ]
    let actionData = useActionData<CreateRoomTypeFormErrors | null>()
    return (
        <>
            <FormBox label="Create Room Type" method="post">

                <InputField
                    label="Room Type Name"
                    name="roomTypeName"
                    type="text"
                    error={actionData?.roomTypeName}
                    required />

                <InputField
                    label="Capacity"
                    name="capacity"
                    type="number"
                    error={actionData?.capacity}
                    required />

                <InputField
                    label="Price"
                    name="price"
                    type="number"
                    error={actionData?.price}
                    required />

                <CheckBox label="Facility" name="facilities" checkList={facilities} />

                <div>
                    <span style={{fontWeight:"bold"}}>Description</span>
                    <br />
                    <textarea name="description" rows={6} style={{width:"70%"}}></textarea >
                    {actionData?.description &&
                        <span style={{ position: "fixed", color: "red" }}> {actionData.description}</span>}
                </div>
                <Button buttonstyle="submit" type="submit">Submit</Button>
            </FormBox>
            <BoxEror error={actionData?.message} />
        </>
    )
}