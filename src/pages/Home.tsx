import { useEffect, useState } from "react"
import { api } from "../api/axios"


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
            <div>Home</div>
            <div>
                {roomTypes.map((roomType) =>
                    <div style={{ border: "1px solid grey", backgroundColor: "purple", padding: 10}}>
                        <div>RoomType: {roomType.name}</div>
                        <div>Description: {roomType.description}</div>
                        <div>Capacity: {roomType.capacity}</div>
                        <div>Facilities: {roomType.facilities.join(", ")}</div>
                        <div>Status: {roomType.statusName}</div>
                        <div>Price: {roomType.price}</div>
                    </div>
                )}
            </div>
        </>
    )
}