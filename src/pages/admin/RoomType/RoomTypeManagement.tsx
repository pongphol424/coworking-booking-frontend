import { useEffect, useState } from "react";
import { RoomTypeSearchForm } from "../../../components/SearchFilterBar/RoomType/RoomTypeSearchForm";
import { Box } from "../../../components/Box/Box";
import { SearchBar } from "../../../components/SearchFilterBar/SearchBar";
import { useLoaderData } from "react-router-dom";
import { RoomTypeList } from "../../../components/RoomType/RoomTypeList";
import type { Roomtype } from "../../../constants/roomType";


interface LoaderDataProp {
    data: Roomtype[]
    queryParams: {
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
}


export function RoomTypeManagement() {
    const loaderData: LoaderDataProp = useLoaderData();
    const [searchResult, setSearchResult] = useState<Roomtype[]>([])
    useEffect(() => {
        setSearchResult(loaderData?.data)
    }, [loaderData])
    
    return (
        <>
            <SearchBar label=" RoomType Search">
                <RoomTypeSearchForm></RoomTypeSearchForm>
            </SearchBar>

            { Object.keys(loaderData.queryParams).length > 0 ? searchResult.length > 0 ?
                <Box>
                    <div>Total Result : {searchResult.length}</div>
                </Box>:
                <Box>
                    <div>Total Result : 0 </div>
                </Box> : ""
            }

            <RoomTypeList to="/admin/room-types" roomTypes={searchResult}/>

        </>
    )
}