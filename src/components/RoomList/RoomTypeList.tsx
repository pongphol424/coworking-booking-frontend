import type { Roomtype } from "../../constants/roomType";
import { Box } from "../Box/Box";


interface RoomTypeListProps {
    roomTypes: Roomtype[]
    to?: string
}

export function RoomTypeList({ roomTypes, to }: RoomTypeListProps) {
    if (to) {
        return <>
            {roomTypes && roomTypes.map((roomType) => (
                <Box to={`${to}/${roomType.id}`} key={roomType.id}>
                    <div>RoomType: {roomType.name}</div>
                    <div>Description: {roomType.description}</div>
                    <div>Capacity: {roomType.capacity}</div>
                    <div>Facilities: {roomType.facilities.join(", ")}</div>
                    <div>Status: {roomType.statusName}</div>
                    <div>Price: {roomType.price}</div>
                </Box>
            ))}
        </>
    }

    return (
        <>
            {roomTypes && roomTypes.map((roomType) => (
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