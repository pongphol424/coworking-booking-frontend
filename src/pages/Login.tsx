import { Form, useActionData, useNavigate, type ActionFunctionArgs } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../context/auth.context";
import { useEffect} from "react";

export async function loginAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    try {
        const res = await api.post('/auth/login', formData)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export function Login() {
    const actionReturn = useActionData()
    const navigate = useNavigate()
    const {login} = useAuth()
    useEffect(() => {
        if(actionReturn?.email){
            login(actionReturn.email)
            navigate('/')
        }
    }, [actionReturn])

    return (
        <>
            <div>Login</div>
            <Form method="post">
                <div>
                    <label>
                        Email: <input name="email" type="email" placeholder="email" required />
                    </label>
                    <br />
                    <label>
                        Password: <input name="password" type="password" placeholder="password" required />
                    </label>
                </div>
                <button type="submit">Login</button>
            </Form>
        </>
    )
}