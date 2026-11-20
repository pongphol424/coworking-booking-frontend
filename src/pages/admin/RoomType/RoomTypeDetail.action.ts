import type { ActionFunctionArgs } from "react-router-dom";
import { api } from "../../../api/axios";
import { TransformError } from "../../../utils/transformErrors";
import { UpdateRoomTypeSchema, type UpdateRoomTypeDto } from "../../../schema/roomtype.schema";
import { validate } from "../../../service/validate";




export async function updateRoomTypeAction({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();
    const body: UpdateRoomTypeDto = {
        name: String(formData.get("name")),
        capacity: Number(formData.get("capacity")),
        price: Number(formData.get("price")),
        description: String(formData.get("description")),
        facilityIds: formData.getAll("facilityIds").map((id) => Number(id))
    }
    
    try {
        await validate(UpdateRoomTypeSchema, body)
        const res = await api.patch(`/admin/room-types/${params.id}`, body);
        alert('Update complete')
        return;
    } catch (error: any) {
        return TransformError(error)
    }
}