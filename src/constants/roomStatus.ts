

export interface RoomStatus {
    id: string;
    name: string;
}


export const RoomStatusIds: RoomStatus[] = [
    { id: "1", name: "Available" },
    { id: "2", name: "InUse" },
    { id: "3", name: "Maintenance" },
    { id: "4", name: "Unavailable" }
]