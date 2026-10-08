import { useLoaderData } from "react-router-dom";
import { RoomTypeList } from "../components/RoomType/RoomTypeList";
import type { Roomtype } from "../constants/roomType";



export function Home() {
    const roomTypes = useLoaderData() as Roomtype[]

    return (
        <RoomTypeList roomTypes={roomTypes}/>
    )
}