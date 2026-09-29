import { api } from "../../api/axios";





export async function userProfileLoader(){
    const {data} = await api.get("/user/profile")
    return data
}