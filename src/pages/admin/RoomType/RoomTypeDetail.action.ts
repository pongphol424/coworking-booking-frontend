import type { ActionFunctionArgs } from "react-router-dom";
import { api } from "../../../api/axios";
import { TransformError } from "../../../utils/transformErrors";
import { CreateRoomTypeSchema, type RoomTypeCreateDto } from "../../../schema/roomtype.schema";
import { validate } from "../../../service/validate";




export async function updateRoomTypeAction({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();
    const body: RoomTypeCreateDto = {
        name: String(formData.get("name")),
        capacity: Number(formData.get("capacity")),
        price: Number(formData.get("price")),
        description: String(formData.get("description")),
        statusId: Number(formData.get("status")),
        facilityIds: formData.getAll("facilityIds").map((id) => Number(id))
    }
    try {
        await validate(CreateRoomTypeSchema, body)
        const res = await api.patch(`/admin/room-types/${params.id}`, body);
        alert('Update complete')
        return;
    } catch (error: any) {
        return TransformError(error)
    }
}