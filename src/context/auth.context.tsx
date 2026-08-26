import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { api, setLogout } from "../api/axios"
import { useNavigate } from "react-router-dom"


interface AuthContextType {
    email: string | null
    isAdmin: boolean
    login: (email: string, isAdmin: boolean) => void
    logout: () => void
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

    const axiosSetLogout = () => {
        setLogout(logout)
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get('/auth/authUser')
                setEmail(res.data.email)
                setIsAdmin(res.data.isAdmin)
            } catch {
                setEmail(null)
            }
        }
        fetch()
        axiosSetLogout()
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ email, isAdmin, login, logout }}>
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