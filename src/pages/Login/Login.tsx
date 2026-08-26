import { useActionData, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useEffect } from "react";
import { InputField } from "../../components/Form/InputField";
import { FormBox } from "../../components/Form/FormBox";
import { BoxEror } from "../../components/Box/BoxError";
import { Button } from "../../components/Button/Button";

interface LoginFormErrors {
    email?: string
    password?: string
    message?: string
}

interface LoginActionProps {
    email: string
    isAdmin: boolean
}


export function Login() {
    const actionData = useActionData<LoginActionProps | LoginFormErrors | null>()
    const navigate = useNavigate()
    const { login } = useAuth()

    useEffect(() => {
        if (actionData !== null && actionData !== undefined &&
            "email" in actionData && "isAdmin" in actionData
        ) {
            login(actionData.email, actionData.isAdmin)
            navigate("/")
        }
    }, [actionData])
    return (
        <>
            <FormBox label="Login" method="post">

                <InputField
                    label="email"
                    name="email"
                    type="email"
                    error={actionData !== null && actionData !== undefined &&
                        "isAdmin" in actionData ? "" : actionData?.email}
                    required />

                <InputField
                    label="password"
                    name="password"
                    type="password"
                    error={actionData !== null && actionData !== undefined &&
                        "isAdmin" in actionData ? "" : actionData?.password}
                    required />

                <Button buttonstyle="submit" type="submit">Login</Button>

            </FormBox>

            <BoxEror error={actionData !== null && actionData !== undefined &&
                        "isAdmin" in actionData ? "" : actionData?.message} />
        </>
    )
}