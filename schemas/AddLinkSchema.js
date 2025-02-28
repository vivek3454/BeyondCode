import { z } from "zod";

export const AddLinkSchema = z.object({
    text: z.string().min(1, "Text is required"),
    url: z.string().url("Invalid URL").min(1, "URL is required"),
});
