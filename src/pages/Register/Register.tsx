import { useActionData } from "react-router-dom";
import { InputField } from "../../components/Form/InputField";
import { Button } from "../../components/Button/Button";
import { FormBox } from "../../components/Form/FormBox";
import { BoxEror } from "../../components/Box/BoxError";

interface RegisterFormErrors {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phoneNumber?: string
    message?: string
}

export function Register() {
    let actionData = useActionData<RegisterFormErrors | null>()
    return (
        <>
            <FormBox method="post" label="Register">

                <InputField
                    label="First Name"
                    name="firstName"
                    type="text"
                    error={actionData?.firstName}
                    required
                />
                <InputField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    error={actionData?.lastName}
                    required
                />
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    error={actionData?.email}
                    required
                />
                
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    error={actionData?.password}
                    required
                />

                <InputField
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    pattern="[0-9],{0-10}"
                    inputMode="numeric"
                    error={actionData?.phoneNumber}
                    required
                />

                <Button buttonstyle="submit" type="submit">Create</Button>

            </FormBox>
            
            <BoxEror error={actionData?.message}/>
        </>
    )
}