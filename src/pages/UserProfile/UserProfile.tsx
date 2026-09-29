import { useEffect, useState } from "react"
import { type UserProfile } from "../../schema/user.schema";
import { useActionData, useLoaderData } from "react-router-dom";
import { FormBox } from "../../components/Form/FormBox";
import { InputField } from "../../components/Form/InputField";
import { Button } from "../../components/Button/Button";
import { BoxEror } from "../../components/Box/BoxError";
import { useAuth } from "../../context/auth.context";

interface UpdateFormErrors {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phoneNumber?: string
    message?: string
}


export function UserProfile() {
    const user = useLoaderData();
    const actionData = useActionData<UpdateFormErrors | null>();
    const { setEmail } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        setProfile(user);
        setEmail(user.email);
    }, [user])

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
                    error={actionData?.firstName} />

                <InputField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    defaultValue={profile?.lastName}
                    disabled={isDisabled}
                    required
                    error={actionData?.lastName} />

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    defaultValue={profile?.email}
                    disabled={isDisabled}
                    required
                    error={actionData?.email} />

                <InputField
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel" pattern="[0-9]*"
                    inputMode="numeric"
                    defaultValue={profile?.phoneNumber}
                    disabled={isDisabled}
                    required
                    error={actionData?.phoneNumber} />

                {!isDisabled ? <div>
                    <Button buttonstyle="submit" type="submit">Save</Button>
                    <Button buttonstyle="cancel" type="button" onClick={handleDisabled}>Cancel</Button>
                </div> :
                    isDisabled ?
                        <Button buttonstyle="button" type="button" onClick={handleDisabled}>Edit Profile</Button> : ""
                }

            </FormBox>
            <BoxEror error={actionData?.message}></BoxEror>
        </>
    )
}