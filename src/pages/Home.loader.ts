import { api } from "../api/axios";




export async function homeLoader(){
    try{
        const {data} = await api.get('/user/room-types',)
        return data
    }catch (err){
        return []
    }

}