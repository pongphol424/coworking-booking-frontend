import * as z from 'zod';



export const CreateRoomTypeSchema = z.object({
    name: z.string().trim().min(1).max(50),
    capacity: z.number().min(1),
    price: z.number().min(1),
    facilityIds: z.array(z.number()).optional(),
    description: z.string().max(65535, "Description is too long").optional()
})


export type RoomTypeCreateDto = z.infer<typeof CreateRoomTypeSchema>