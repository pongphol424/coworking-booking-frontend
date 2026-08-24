import { api } from "../../api/axios";
import { UserProfileSchema } from "../../schema/user.schema";
import { type ActionFunctionArgs } from "react-router-dom";
import { validate } from "../../service/validate";
import { TransformError } from "../../utils/transformErrors";



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

