import type { Roomtype } from "../../constants/roomType";
import { Box } from "../Box/Box";



export function RoomTypeList({roomTypes}:{roomTypes:Roomtype[]}) {

    return (
        <>
            {roomTypes.map((roomType) => (
                <Box key={roomType.id}>
                    <div>RoomType: {roomType.name}</div>
                    <div>Description: {roomType.description}</div>
                    <div>Capacity: {roomType.capacity}</div>
                    <div>Facilities: {roomType.facilities.join(", ")}</div>
                    <div>Status: {roomType.statusName}</div>
                    <div>Price: {roomType.price}</div>
                </Box>
            ))}
        </>
    )
}