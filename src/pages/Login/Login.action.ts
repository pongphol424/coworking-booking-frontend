import { type ActionFunctionArgs } from "react-router-dom";
import { api } from "../../api/axios";
import { LoginSchema } from "../../schema/user.schema";
import { validate } from "../../service/validate";
import { TransformError } from "../../utils/transformErrors";



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