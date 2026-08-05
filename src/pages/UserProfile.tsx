import { useEffect, useState } from "react"
import { api } from "../api/axios";
import { UserProfileSchema, type UserProfile } from "../schema/user.schema";
import { Form, useActionData, useNavigate, type ActionFunctionArgs } from "react-router-dom";
import { validate } from "../service/validate";
import { useAuth } from "../context/auth.context";
import { TransformError } from "../utils/transformErrors";

interface UpdateFormErrors {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phoneNumber?: string
    message?: string
}

export async function updateAccountAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    let updateData: Record<string, FormDataEntryValue> = {};
    for (const [key, value] of formData.entries()) {
        updateData[key] = value;
    };
    try {
        await validate(UserProfileSchema, updateData);
        const res = await api.patch('/user/updateProfile', updateData);
        alert('Update complete')
        return res.data.email;
    } catch (error: any) {
        return TransformError(error)
    }
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
    const handleDisabled = ()=>{
        setIsDisabled(!isDisabled);
        setFormKey(prev => prev+1);
    }

    return (
        <>
            <div style={{ position: "relative" }}>
                <h1>User Profile</h1>
                <Form method="post" key={formKey}>
                    <div style={{ width: 800, margin: "auto" }}>
                        <div>

                            <div>
                                <label style={{ fontWeight: "bold" }}>First Name
                                    <br />
                                    <input
                                        name="firstName"
                                        type="text"
                                        placeholder="First name"
                                        defaultValue={profile?.firstName}
                                        disabled={isDisabled}
                                        required
                                    />
                                </label>

                                {typeof (actionData) !== "string" &&
                                    actionData?.firstName &&
                                    <span style={{ position: "fixed", color: "red" }}> {actionData.firstName}</span>}
                            </div>

                            <div>
                                <label style={{ fontWeight: "bold" }}>Last Name
                                    <br />
                                    <input
                                        name="lastName"
                                        type="text"
                                        placeholder="Last name"
                                        defaultValue={profile?.lastName}
                                        disabled={isDisabled}
                                        required
                                    />
                                </label>

                                {typeof (actionData) !== "string" &&
                                    actionData?.lastName &&
                                    <span style={{ position: "fixed", color: "red" }}> {actionData.lastName}</span>}
                            </div>

                            <div>
                                <label style={{ fontWeight: "bold" }}>Email
                                    <br />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="email"
                                        defaultValue={profile?.email}
                                        disabled={isDisabled}
                                        required
                                    />
                                </label>

                                {typeof (actionData) !== "string" &&
                                    actionData?.email &&
                                    <span style={{ position: "fixed", color: "red" }}> {actionData.email}</span>}
                            </div>

                            <div>
                                <label style={{ fontWeight: "bold" }}>Phone Number
                                    <br />
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel" pattern="[0-9]*"
                                        inputMode="numeric"
                                        placeholder="Phone number"
                                        defaultValue={profile?.phoneNumber}
                                        disabled={isDisabled}
                                        required
                                    />
                                </label>

                                {typeof (actionData) !== "string" &&
                                    actionData?.phoneNumber
                                    && <span style={{ position: "fixed", color: "red" }}> {actionData.phoneNumber}</span>}
                            </div>
                            <br />
                            {!isDisabled && <button type="submit">Save</button>}
                        </div>
                    </div>
                </Form>
                {isDisabled ?
                    <button onClick={handleDisabled}>Edit Profile</button> :
                    <button onClick={handleDisabled}>Cancel</button>
                }
                {typeof (actionData) !== "string" &&
                    actionData?.message &&
                    <div>{actionData.message}</div>}
            </div>
        </>
    )
}