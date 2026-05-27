import { Form, redirect, type ActionFunctionArgs } from "react-router-dom";
import { api } from "../api/axios";

export async function loginAction({request}:ActionFunctionArgs) {
    const formData = await request.formData();
    try{
        const res = await api.post('/auth/login',formData)
        console.log(res)
        return redirect("/")
    }catch(error){
        console.log(error)
    }
}

export function Login() {

    return (
        <>
            <div>Login</div>
            <Form method="post">
                <div>
                    <label>
                        Email: <input name="email" type="email" placeholder="email" required />
                    </label>
                    <br/>
                    <label>
                        Password: <input name="password" type="password" placeholder="password" required />
                    </label>
                </div>
                    <button type="submit">Login</button>
            </Form>
        </>
    )
}