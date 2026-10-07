import { useEffect, useState } from "react";
import { RoomTypeSearchForm } from "../../../components/SearchFilterBar/RoomType/RoomTypeSearchForm";
import { Box } from "../../../components/Box/Box";
import { SearchBar } from "../../../components/SearchFilterBar/SearchBar";
import { useLoaderData } from "react-router-dom";
import { RoomTypeList } from "../../../components/RoomList/RoomTypeList";
import type { Roomtype } from "../../../constants/roomType";





export function RoomTypeManagement() {
    const loaderData = useLoaderData();
    const [searchResult, setSearchResult] = useState<Roomtype[]>([])
    useEffect(() => {
        setSearchResult(loaderData?.data)
    }, [loaderData])

    return (
        <>
            <SearchBar label=" RoomType Search">
                <RoomTypeSearchForm></RoomTypeSearchForm>
            </SearchBar>

            {searchResult?.length > 0 &&
                <Box>
                    <div>Total Result : {searchResult.length}</div>
                </Box>
            }

            <RoomTypeList to="/admin/room-types" roomTypes={searchResult}/>

        </>
    )
}