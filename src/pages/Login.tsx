import { Form, useActionData, useNavigate, type ActionFunctionArgs } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../context/auth.context";
import { useEffect } from "react";
import { LoginSchema } from "../schema/user.schema";
import { validate } from "../service/validate";
import { TransformError } from "../utils/transformErrors";

interface LoginFormErrors {
    email?: string
    password?: string
    message?: string
}

export async function loginAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    let loginData: Record<string, FormDataEntryValue> = {};
    for (const [key, value] of formData.entries()) {
        loginData[key] = value;
    };

    try {
        await validate(LoginSchema, loginData)
        const res = await api.post('/auth/login', loginData);
        const email: string = res.data.email;
        return email;

    } catch (error: any) {
       return TransformError(error)
    }
}

export function Login() {
    const actionReturn = useActionData<string | LoginFormErrors | null>()
    const navigate = useNavigate()
    const { login, logout } = useAuth()

    useEffect(() => {
        if (typeof (actionReturn) === "string") {
            login(actionReturn)
            navigate('/')
        }else{
            logout()
        }
    }, [actionReturn, login, logout, navigate])

    return (
        <>
            <div>Login</div>

            <Form method="post">
                <div>
                    <label>
                        Email:
                        <input
                            name="email"
                            type="email"
                            placeholder="email" required
                        />
                    </label>

                    {typeof (actionReturn) !== "string" &&
                        actionReturn?.email &&
                        <span>{actionReturn.email}</span>
                    }

                    <br />

                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            required
                        />
                    </label>

                    {typeof (actionReturn) !== "string" &&
                        actionReturn?.password &&
                        <span>{actionReturn.password}</span>
                    }
                </div>

                <button type="submit">Login</button>
            </Form>

            <div>
                {typeof (actionReturn) !== "string" &&
                    actionReturn?.message &&
                    <span>{actionReturn.message}</span>
                }
            </div>
        </>
    )
}