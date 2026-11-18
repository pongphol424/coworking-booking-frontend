import styles from "./RoomTypeDetail.module.css"
import { useActionData, useLoaderData, useSearchParams } from "react-router-dom"
import { RoomTypeForm } from "../../../components/RoomType/RoomTypeForm"
import type { Roomtype } from "../../../constants/roomType"
import { facilityIds } from "../../../constants/facilities"
import { Button } from "../../../components/Button/Button"
import { useState } from "react"

interface defaultValueProps {
    name: string
    capacity: number
    price: number
    statusId: number
    facility: number[]
    description: string | null
}

interface paginationProps {
    limit: number
    page: number
    total: number
    totalPages: number
}

interface loaderDataProps {
    roomTypeData: Roomtype
    roomTypeHistory: {
        data: {
            roomTypeId: number
            statusName: string
            startDate: string
            endDate: string
            statusHistoryId: number
        }[]
        pagination: paginationProps
    }
    sort: {
        sortBy: string
        orderBy: string
    }
}

interface historyProps {
    statusHistoryId: number
    statusName: string
    startDate: Date
    endDate: Date | null
}

export function RoomTypeDetail() {
    const loaderData = useLoaderData<loaderDataProps>();
    const actionData = useActionData();
    const [searchParams, setSearchParams] = useSearchParams();

    const [sortBy, setSortBy] = useState<string>(loaderData.sort.sortBy)
    const [orderBy, setOrderBy] = useState<string>(loaderData.sort.orderBy)
    const { roomTypeData, roomTypeHistory } = loaderData;
    const { data: statusData, pagination } = roomTypeHistory;

    const history: historyProps[] = [];

    statusData.map((data) => {
        const parsedata = {
            statusHistoryId: Number(data.statusHistoryId),
            statusName: data.statusName,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null
        }
        history.push(parsedata)
    });




    function handleSort(column: string) {
        const newSortBy = column;
        const newOrderBy = sortBy === column ?
            orderBy === 'desc' ? 'asc' : 'desc'
            : 'desc';

        setSortBy(newSortBy);
        setOrderBy(newOrderBy);

        const params = new URLSearchParams(searchParams);
        params.set('sortBy', newSortBy);
        params.set('orderBy', newOrderBy);
        
        setSearchParams(params);
    }

    function changePage(nextPage: number) {
        const params = new URLSearchParams(searchParams);

        params.set("page", String(nextPage));
        params.set("limit", String(pagination.limit));

        setSearchParams(params);
    }

    const facilityNames = roomTypeData.facilities.map((facility) => facility.toLowerCase());
    const facilityChackedIds = facilityIds
        .filter((facility) => facilityNames.includes(facility.name.toLowerCase()))
        .map((facility) => facility.id);

    const defaultValues: defaultValueProps = { ...roomTypeData, facility: facilityChackedIds }

    return (
        <>
            <div>

                <RoomTypeForm
                    label="Room Type Detail"
                    method="patch"
                    defaultValues={defaultValues}
                    errors={actionData}
                />

                <div>
                    <table>
                        <thead>
                            <tr>

                                <th onClick={() => handleSort("startDate")}>
                                    {sortBy === "startDate" ? orderBy === 'desc' ? "Start Date ▾" : "Start Date ▴"
                                        : "Start Date ─"}
                                </th>

                                <th onClick={() => handleSort("endDate")}>
                                    {sortBy === "endDate" ? orderBy === 'desc' ? "End Date ▾" : "End Date ▴"
                                        : "End Date ─"}
                                </th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((status) =>
                                <tr key={status.statusHistoryId}>
                                    <td>{`${status.startDate.toLocaleDateString("en-GB")} | ${status.startDate.toLocaleTimeString("en-GB", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                    })}`}
                                    </td>

                                    <td>{`${status.endDate?.toLocaleDateString("en-GB") || `--/--/--`} | ${status.endDate?.toLocaleTimeString("en-GB", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                    }) || `--:--`}`}
                                    </td>

                                    <td>{status.statusName}</td>
                                </tr>
                            )}

                        </tbody>

                    </table>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        buttonstyle="button"
                        disabled={pagination.page <= 1}
                        onClick={() => changePage(pagination.page - 1)}
                    >
                        Previous
                    </Button>

                    <div style={{ paddingTop: "15px" }}>
                        Page {pagination.page} of {pagination.totalPages}
                    </div>

                    <Button
                        buttonstyle="button"
                        disabled={pagination.page >= pagination.totalPages}
                        onClick={() => changePage(pagination.page + 1)}
                    >
                        Next
                    </Button>
                </div>

            </div>
        </>
    )
}