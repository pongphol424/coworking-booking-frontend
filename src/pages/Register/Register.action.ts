import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { api } from "../../api/axios";
import { validate } from "../../service/validate";
import { RegisterSchema } from "../../schema/user.schema";
import { TransformError } from "../../utils/transformErrors";


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