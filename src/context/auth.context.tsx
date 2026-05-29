import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { api } from "../api/axios"


interface AuthContextType{
    email: string | null
    login: (email: string) => void
    logout: () => void
}


const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}:{children:ReactNode}){
    const [email, setEmail] = useState<string | null>(null);
    useEffect(()=>{
        const fetch = async()=>{
            try{
                const res = await api.get('/auth/authUser')
                setEmail(res.data.email)
            }catch{
                setEmail(null)
            }
        }
        fetch()
    },[]);
    const login = (email:string)=>setEmail(email);
    const logout = async()=> {
        await api.post('/auth/logout');
        setEmail(null);
    };


    return(
        <>
        <AuthContext.Provider value={{email,login,logout}}>
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