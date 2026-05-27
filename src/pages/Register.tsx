import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router-dom";
import { api } from "../api/axios";
import { validate } from "../service/validate";
import { RegisterSchema } from "../schema/user.schema";
import { AxiosError } from "axios";
import { ZodError } from "zod";

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
        if(error instanceof AxiosError){
            if(error.response?.data){
                const messageObject= error.response.data;
                console.log(messageObject)
                return messageObject;
            }
        }
        if (error instanceof ZodError) {
            const messageObject = error.issues.reduce<Record<string,string[]>>((acc, issue)=>{
                const key = String(issue.path[0])
                acc[key] = [...(acc.key??[]), issue.message]
                return acc
            },{});
            return messageObject;
        }
        throw error
    }
}


export function Register() {
    let actionData = useActionData()
    return (
        <>
            <div>Register</div>
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
                        <br/>
                        
                        <button type="submit">Create Account</button>
                    
                    </div>
                </div>
            </Form>
            <div>{actionData?.message}</div>
        </>
    )
}