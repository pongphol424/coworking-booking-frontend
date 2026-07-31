import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { api, setLogout } from "../api/axios"


interface AuthContextType{
    email: string | null
    role: any | null
    login: (email: string) => void
    logout: () => void
}


const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}:{children:ReactNode}){
    const [email, setEmail] = useState<string | null>(null);
    const [role, setRole] = useState<any |null >(null);
    const axiosSetLogout = ()=> {
        setLogout(logout)
    };

    const login = (email:string)=>setEmail(email);
    const logout = async()=> {
        await api.post('/auth/logout');
        setEmail(null);
    };

    useEffect(()=>{
        const fetch = async()=>{
            try{
                const res = await api.get('/auth/authUser')
                setEmail(res.data.email)
                setRole(res.data.isAdmin)
            }catch{
                setEmail(null)
            }
        }
        fetch()
        axiosSetLogout()
    },[]);

    return(
        <>
        <AuthContext.Provider value={{email,role,login,logout}}>
            {children}
        </AuthContext.Provider>
        </>
    )
}

export function useAuth():AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}