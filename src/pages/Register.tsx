import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router-dom";
import { api } from "../api/axios";
import { validate } from "../service/validate";
import { RegisterSchema } from "../schema/user.schema";
import { TransformError } from "../utils/transformErrors";

interface RegisterFormErrors {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phoneNumber?: string
    message?: string
}

export async function createAccountAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    let registerData: Record<string, FormDataEntryValue> = {};
    for (const [key, value] of formData.entries()) {
        registerData[key] = value;
    };
    try {
        await validate(RegisterSchema, registerData);
        await api.post('/auth/register', registerData);
        return redirect('/');
    } catch (error: any) {
        return TransformError(error);
    }
}

export function Register() {
    let actionData = useActionData<RegisterFormErrors | null>()
    return (
        <>
            <h1>Register</h1>
            <Form method="post">
                <div style={{ width: 800, margin: "auto" }}>
                    <div style={{ position: "relative" }}>

                        <div>
                            <label style={{ fontWeight: "bold" }}>First Name
                                <br />
                                <input name="firstName" type="text" placeholder="First name" required />
                            </label>

                            {actionData?.firstName &&
                                <span style={{ position: "fixed", color: "red" }}> {actionData.firstName}</span>}
                        </div>

                        <div>
                            <label style={{ fontWeight: "bold" }}>Last Name
                                <br />
                                <input name="lastName" type="text" placeholder="Last name" required />
                            </label>

                            {actionData?.lastName &&
                                <span style={{ position: "fixed", color: "red" }}> {actionData.lastName}</span>}
                        </div>

                        <div>
                            <label style={{ fontWeight: "bold" }}>Email
                                <br />
                                <input name="email" type="email" placeholder="email" required />
                            </label>

                            {actionData?.email &&
                                <span style={{ position: "fixed", color: "red" }}> {actionData.email}</span>}
                        </div>

                        <div>
                            <label style={{ fontWeight: "bold" }}>Password
                                <br />
                                <input name="password" type="password" placeholder="password" required />
                            </label>

                            {actionData?.password &&
                                <span style={{ position: "fixed", color: "red" }}> {actionData.password}</span>}
                        </div>

                        <div>
                            <label style={{ fontWeight: "bold" }}>Phone Number
                                <br />
                                <input id="phoneNumber" name="phoneNumber" type="tel" pattern="[0-9]*" inputMode="numeric" placeholder="Phone number" required />
                            </label>

                            {actionData?.phoneNumber
                                && <span style={{ position: "fixed", color: "red" }}> {actionData.phoneNumber}</span>}
                        </div>
                        <br />

                        <button type="submit">Create Account</button>

                    </div>
                </div>
            </Form>
            <div>{actionData?.message}</div>
        </>
    )
}