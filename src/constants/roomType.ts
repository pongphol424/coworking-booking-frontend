export interface Roomtype {
    id: number,
    name: string,
    description: string | null,
    capacity: number,
    price: number,
    statusName: string,
    facilities: string[]
}