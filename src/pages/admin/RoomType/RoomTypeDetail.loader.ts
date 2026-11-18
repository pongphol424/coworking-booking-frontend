import type { LoaderFunctionArgs } from "react-router-dom";
import { api } from "../../../api/axios";


interface queryParamProps {
    page: number
    limit: number
    sortBy: string
    orderBy: string
}



export async function roomTypeDetailLoader({ request, params }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const queryParams: queryParamProps = {
        page: url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1,
        limit: url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : 10,
        sortBy: url.searchParams.get('sortBy') || 'startDate',
        orderBy: url.searchParams.get('orderBy') || 'desc'
    }
    const roomType = await api.get(`admin/room-types/${params.id}`)
    const status = await api.get(`admin/room-types/${params.id}/status-history`,
        { params: queryParams }
    )
    return {
        roomTypeData: roomType.data[0],
        roomTypeHistory: status.data,
        sort: {
            sortBy: queryParams.sortBy,
            orderBy: queryParams.orderBy
        }
    }
}