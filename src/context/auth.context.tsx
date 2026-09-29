import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { api, setClearContext } from "../api/axios"
import { useNavigate } from "react-router-dom"
import axios from "axios"


interface AuthContextType {
    email: string | null
    isAdmin: boolean
    login: (email: string, isAdmin: boolean) => void
    logout: () => void
    setEmail: (email: string) => void
}


const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const login = (email: string, isAdmin: boolean) => {
        setEmail(email);
        setIsAdmin(isAdmin)
    }
    const logout = async () => {
        await api.post('/auth/logout');
        setEmail(null);
        setIsAdmin(false)
        navigate("/")
    };

    const clearContext = ()=>{
        setEmail(null)
        setIsAdmin(false)
        navigate("/")
    }

    const axiosSetClearContext = () => {
        setClearContext(clearContext)
    };

    useEffect(() => {
        const controller = new AbortController()
        const fetch = async () => {
            try {
                const res = await api.get('/auth/authUser',{
                    signal: controller.signal
                })
                setEmail(res.data.email)
                setIsAdmin(res.data.isAdmin)
            } catch(err) {
                if(axios.isCancel(err)) return
                setEmail(null)
            }
        }
        fetch()
        axiosSetClearContext()
        return ()=> controller.abort()
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ email, isAdmin, login, logout, setEmail }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within AuthProvider")
    return ctx
}