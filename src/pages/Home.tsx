import { useLoaderData } from "react-router-dom";
import { RoomTypeList } from "../components/RoomList/RoomTypeList";
import type { Roomtype } from "../constants/roomType";



export function Home() {
    const roomTypes = useLoaderData() as Roomtype[]

    return (
        <RoomTypeList roomTypes={roomTypes}/>
    )
}