import type { ActionFunctionArgs } from "react-router-dom";
import { CreateRoomTypeSchema, type RoomTypeCreateDto } from "../../../schema/roomtype.schema";
import { validate } from "../../../service/validate";
import { api } from "../../../api/axios";
import { TransformError } from "../../../utils/transformErrors";




export async function createRoomtypeAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const body: RoomTypeCreateDto = {
        name: String(formData.get("name")),
        capacity: Number(formData.get("capacity")),
        price: Number(formData.get("price")),
        description: String(formData.get("description")),
        facilityIds: formData.getAll("facilityIds").map(id => Number(id))
    }
    try {
        await validate(CreateRoomTypeSchema, body)
        await api.post('/admin/room-types', body)
        alert('Create room type complete')
    } catch (error: any) {
        return TransformError(error)
    }
}