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

export function Login() {
    const actionData = useActionData<string| LoginFormErrors | null>()
    const navigate = useNavigate()
    const { login, logout } = useAuth()

    useEffect(() => {
        if (typeof (actionData) === "string") {
            login(actionData)
            navigate('/')
        } else {
            logout()
        }
    }, [actionData, login, logout, navigate])
    console.log(actionData)
    return (
        <>
            <FormBox label="Login" method="post">
                
                <InputField
                    label="email"
                    name="email"
                    type="email"
                    error={typeof (actionData) !== "string" ? actionData?.email : ""}
                    required/>
                
                <InputField
                    label="password"
                    name="password"
                    type="password"
                    error={typeof (actionData) !== "string" ? actionData?.password : ""}
                    required/>

                <Button buttonstyle="submit" type="submit">Login</Button>

            </FormBox>

            <BoxEror error={typeof (actionData) !== "string" ? actionData?.message :""}/>
        </>
    )
}