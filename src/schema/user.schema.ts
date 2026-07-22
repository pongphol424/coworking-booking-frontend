import * as z from 'zod';




export const UserBaseSchema = z.object({
    email: z.email().trim().min(1).max(255)
});

export const RegisterSchema = UserBaseSchema.extend({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    phoneNumber: z.string().trim().regex(/^0(2\d{7}|[3-9]\d{8})$/,{error:"Phone number must start with 0 and be 9 to 10 digits."}),
    password: z.string().trim().min(8).max(255)
});

export const LoginSchema = UserBaseSchema.extend({
    password: z.string().trim().min(8).max(255)
});


export const UserProfileSchema = RegisterSchema.omit({ password: true });
export type UserProfile = z.infer<typeof UserProfileSchema>;


// z.config({
//     customError: (iss) => {
//         if (iss.input === undefined && iss.path) {
//             return `${String(iss.path[0])} is required`
//         }

//         if (iss.code === "invalid_type" && iss.path) {
//             return `invalid type, ${String(iss.path[0])} expected ${iss.expected}`;
//         }

//         if (iss.code === "invalid_format" && iss.path) {
//             return `${String(iss.path[0])} is invalid format`
//         }

//         if (iss.code === "too_small" && iss.path) {
//             if (iss.origin === "number") {
//                 return `${String(iss.path[0])} must be at least ${iss.minimum}`
//             }
//             if (iss.origin === "string") {
//                 return `${String(iss.path[0])} must be at least ${iss.minimum} cheracter`
//             }
//             if (iss.origin === "date") {
//                 return `${String(iss.path[0])} must be after ${new Date().toISOString().split("T")[0]}`
//             }
//         }

//         if (iss.code === "too_big" && iss.path) {
//             if (iss.origin === "number") {
//                 return `${String(iss.path[0])} cannot be greater than ${iss.maximum}`
//             }
//             if (iss.origin === "string") {
//                 return `${String(iss.path[0])} cannot be greater than ${iss.maximum} cheracter`
//             }
//             if (iss.origin === "date") {
//                 return `${String(iss.path[0])} must before ${new Date().toISOString().split("T")[0]}`
//             }
//         }
//         return `${iss.errors}`
//     }
// })