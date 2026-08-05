import { AxiosError } from "axios";
import { ZodError } from "zod";


const apiErrorCodeMap: Record<string, { field: string, message: string }> = {
    INVALID_CREDENTIALS: { field: "message", message: "Invalid email or password" },
    EMAIL_ALREADY_EXISTS: { field: "email", message: "Email already exists" },
    PHONE_NUMBER_ALREADY_EXISTS: { field: "phoneNumber", message: "Phone number already exists" },
    ROOM_TYPE_NAME_ALREADY_EXISTS: { field: "roomTypeName", message: "Room type name already exists" }
}

const zodErrorCodeMap: Record<string, string> = {
    too_big: "too long" ,
    too_small: "too short",
    invalid_format: "invalid format",
    invalid_type: "invalid format"
}

const errorFieldMap: Record<string, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    password:"Password",
    phoneNumber: "Phone number"
}

export function TransformError(error: any): Record<string, string> {
    if (error instanceof AxiosError && error.response?.data) {
        const response = error.response.data;
        const mapped = apiErrorCodeMap[response.code];
        if (mapped) {
            const error: Record<string, string> = {};
            error[mapped.field] = mapped.message
            return error;
        }

        if (response.code === "VALIDATION_ERROR") {
            const errors: Record<string, string> = {};
            for (const key of Object.keys(response.errors)) {
                for (const value of response.errors[key]) {
                    const messageMapped = zodErrorCodeMap[value.code];
                    if (messageMapped) {
                        const fieldMapped = errorFieldMap[key];
                        errors[key] = fieldMapped && !errors[key] ? `${fieldMapped} ${messageMapped}` : 
                            `${errors[key]}, ${messageMapped}`;
                    }
                }
            }

            if (Object.keys(errors).length > 0) {
                return errors;
            }
        }

        if (response.code === "DUPLICATE_ENTRY") {
            const errors: Record<string, string> = {};
            for (const key of Object.keys(response.errors)) {
                const mapped = apiErrorCodeMap[key];
                if (mapped) {
                    errors[mapped.field] = mapped.message;
                }
            }

            if (Object.keys(errors).length > 0) {
                return errors;
            }
        }
    }


    if (error instanceof ZodError) {
        const messageObject = error.issues.reduce<Record<string, string>>((acc, issue) => {
            const key = String(issue.path[0]);
            const fieldMapped = errorFieldMap[key];
            const phoneNumberErrorMessage: string | null = key === "phoneNumber" ? issue.message : null
            acc[key] = !acc[key] && phoneNumberErrorMessage  ? `${phoneNumberErrorMessage}` :
                fieldMapped && !acc[key] ? `${fieldMapped} ${zodErrorCodeMap[issue.code]}` :
                zodErrorCodeMap[issue.code] ? `${acc[key]}, ${zodErrorCodeMap[issue.code]}` : acc[key];
            return acc
        }, {});
        return messageObject;
    }

    throw(error)
}