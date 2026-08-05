import { Form, useActionData, type ActionFunctionArgs } from "react-router-dom";
import { api } from "../api/axios";
import { validate } from "../service/validate";
import { CreateRoomTypeSchema, type RoomTypeCreateDto } from "../schema/roomtype.schema";
import { TransformError } from "../utils/transformErrors";

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

    } catch (error: any) {
        return TransformError(error)
    }
}


export function CreateRoomType() {
    const facilities = [
        { id: 1, name: "TV" },
        { id: 2, name: "Projector" },
        { id: 3, name: "Speaker" },
        { id: 4, name: "board" }
    ]
    let actionData = useActionData<CreateRoomTypeFormErrors | null>()
    return (
        <>
            <h1>Create Room Type</h1>
            <div>
                <Form method="post">
                    <div>
                        <div>
                            Room Type Name
                            <br />
                            <input name="roomTypeName" type="text" required></input>
                            {actionData?.roomTypeName &&
                                <span style={{ position: "fixed", color: "red" }}> {actionData.roomTypeName}</span>}
                        </div>
                        <div>
                            Capacity
                            <br />
                            <input name="capacity" type="number" required></input>
                            {actionData?.capacity &&
                                <span style={{ position: "fixed", color: "red" }}> {actionData.capacity}</span>}
                        </div>
                        <div>
                            Price
                            <br />
                            <input name="price" type="number" required></input>
                            {actionData?.price &&
                                <span style={{ position: "fixed", color: "red" }}> {actionData.price}</span>}
                        </div>
                        <div>
                            Facility
                            <br />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {facilities.map((facility) =>
                                    <label key={facility.id}>{facility.name}
                                        <input key={facility.id} name="facilities" type="checkbox" value={facility.id} ></input>
                                    </label>
                                )}
                            </div>
                        </div>
                        <div>
                            Description
                            <br />
                            <textarea name="description" rows={6}></textarea >
                            {actionData?.description &&
                                <span style={{ position: "fixed", color: "red" }}> {actionData.description}</span>}
                        </div>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
                <div>{actionData?.message}</div>
            </div>
        </>
    )
}