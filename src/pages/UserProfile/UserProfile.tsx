import { useEffect, useState } from "react"
import { api } from "../../api/axios";
import { type UserProfile } from "../../schema/user.schema";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { FormBox } from "../../components/Form/FormBox";
import { InputField } from "../../components/Form/InputField";
import { Button } from "../../components/Button/Button";
import { BoxEror } from "../../components/Box/BoxError";

interface UpdateFormErrors {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phoneNumber?: string
    message?: string
}


export function UserProfile() {
    const navigate = useNavigate()
    let actionData = useActionData<string | UpdateFormErrors | null>()
    const { login, logout } = useAuth()
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isDisabled, setIsDisabled] = useState(true)
    const [formKey, setFormKey] = useState(0)
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get('/user/profile')
                setProfile(res.data)
                if (typeof (actionData) === "string") {
                    login(actionData)
                }
            } catch (error) {
                logout()
                navigate('/')
            }
        }
        fetch()
    }, [actionData])
    const handleDisabled = () => {
        setIsDisabled(!isDisabled);
        setFormKey(prev => prev + 1);
    }

    return (
        <>
            <FormBox label="User Profile" method="post" key={formKey}>
                <InputField
                    label="First Name"
                    name="firstName"
                    type="text"
                    defaultValue={profile?.firstName}
                    disabled={isDisabled}
                    required
                    error={typeof (actionData) !== "string" ? actionData?.firstName : ""} />

                <InputField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    defaultValue={profile?.lastName}
                    disabled={isDisabled}
                    required
                    error={typeof (actionData) !== "string" ? actionData?.lastName : ""} />

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    defaultValue={profile?.email}
                    disabled={isDisabled}
                    required
                    error={typeof (actionData) !== "string" ? actionData?.email : ""} />

                <InputField
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel" pattern="[0-9]*"
                    inputMode="numeric"
                    defaultValue={profile?.phoneNumber}
                    disabled={isDisabled}
                    required
                    error={typeof (actionData) !== "string" ? actionData?.phoneNumber : ""} />

                {!isDisabled ? <div>
                    <Button buttonstyle="submit" type="submit">Save</Button>
                    <Button buttonstyle="cancel" type="button" onClick={handleDisabled}>Cancel</Button>
                </div> :
                    isDisabled ?
                        <Button buttonstyle="button" type="button" onClick={handleDisabled}>Edit Profile</Button> : ""
                }

            </FormBox>
            <BoxEror error={typeof (actionData) !== "string" ? actionData?.message : ""}></BoxEror>
        </>
    )
}