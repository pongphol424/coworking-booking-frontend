import type { LoaderFunctionArgs } from "react-router-dom";
import { api } from "../../../api/axios";


interface RoomTypeSearchParams {
    id: number | null
    roomTypeName: string | null
    capacityMin: Number | null
    capacityMax: Number | null
    priceMin: Number | null
    priceMax: Number | null
    dateStart: string | null
    dateEnd: string | null
    timeStart: string | null
    timeEnd: string | null
    status: number | null
    facilityIds: Number[]
}



export async function roomTypeSearchHandle({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    if (url.searchParams.size) {
        const queryParams: RoomTypeSearchParams = {
            id: url.searchParams.get("id") ? Number(url.searchParams.get("id")) : null,
            roomTypeName: url.searchParams.get("roomTypeName"),
            capacityMin: url.searchParams.get("capacityMin") ? Number(url.searchParams.get("capacityMin")) : null,
            capacityMax: url.searchParams.get("capacityMax") ? Number(url.searchParams.get("capacityMax")) : null,
            priceMin: url.searchParams.get("priceMin") ? Number(url.searchParams.get("priceMin")) : null,
            priceMax: url.searchParams.get("priceMax") ? Number(url.searchParams.get("priceMax")) : null,
            dateStart: url.searchParams.get("dateStart"),
            dateEnd: url.searchParams.get("dateEnd"),
            timeStart: url.searchParams.get("timeStart"),
            timeEnd: url.searchParams.get("timeEnd"),
            status: url.searchParams.get("status") ? Number(url.searchParams.get("status")) : null,
            facilityIds: url.searchParams.getAll("facilityIds").map(Number)
        }
        const res = await api.get('/admin/room-types', { params: queryParams })
        return {
            data: res.data,
            queryParams: queryParams
        }
    }
    return {
        data: [],
        queryParams: {}
    }
}