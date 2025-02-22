import { z } from "zod";

export const AddMenuItemSchema = z.object({
    title: z.string().min(1, "Title is required"),
    isLink: z.boolean().default(false),
    type: z.enum(["single", "multiple"]).default("single"),
})