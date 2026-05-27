import { ZodType } from "zod";

export const validate = async (schema: ZodType, data: any) => {
    const result = await schema.safeParseAsync(data);
    if (!result.success) {
        throw result.error
    }
}
