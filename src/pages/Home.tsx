import { useEffect, useState } from "react"
import { api } from "../api/axios"
import { Box } from "../components/Box/Box";

interface Roomtype {
    id: number,
    name: string,
    description: string | null,
    capacity: number,
    price: number,
    statusName: string,
    facilities: string[]
}

export function Home() {
    const [roomTypes, setRoomTypes] = useState<Roomtype[]>([])
    useEffect(() => {
        const fetch = async () => {
            const response = await api.get('/user/room-types')
            setRoomTypes(response.data)
        };
        fetch();
    }, []);

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
            )
            )}
        </>
    )
}