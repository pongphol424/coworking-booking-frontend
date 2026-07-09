import { Form, useActionData, useNavigate, type ActionFunctionArgs } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../context/auth.context";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { LoginSchema } from "../schema/user.schema";
import { validate } from "../service/validate";
import { ZodError } from "zod";

interface LoginFormErrors {
    email?: string[]
    password?: string[]
    message?: string
}

type BackendValidationError = Record<string, string[]>

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
        if (error instanceof AxiosError) {
            if (error.response?.data) {
                if (error.response.data.code === "VALIDATION_ERROR") {
                    const errors: BackendValidationError = error.response.data.error
                    return errors
                }
                if (error.response.data.code === "INVALID_CREDENTIALS") {
                    const message = "Invalid email or password";
                    return { message };
                };
            };
        };

        if (error instanceof ZodError) {
            const messageObject = error.issues.reduce<Record<string, string[]>>(
                (acc, issue) => {
                    const key = String(issue.path[0]);
                    acc[key] = [...(acc[key] ?? []), issue.message];
                    return acc;
                }, {});
            return messageObject;
        };

        throw error;
    }
}

export function Login() {
    const actionReturn = useActionData<string | LoginFormErrors | null>()
    const navigate = useNavigate()
    const { login } = useAuth()

    useEffect(() => {
        if (typeof (actionReturn) === "string") {
            login(actionReturn)
            navigate('/')
        }
    }, [actionReturn, login, navigate])

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