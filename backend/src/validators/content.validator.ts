import { z } from "zod";

const contentTypes = [
  "image",
  "video",
  "article",
  "audio",
  "youtube",
  "twitter",
] as const;

export const contentSchema = z.object({
  link: z.string().url({ message: "Please provide a valid URL." }),
  type: z.enum(contentTypes),
  title: z
    .string()
    .min(3, "Title must be atleast 3 characters.")
    .max(20, "Title can be at max 20 characters"),
  note: z.string().max(2000, "Note can be at max 2000 characters.").optional(),
  tags: z.array(z.string()).optional(),
});

export const updateContentSchema = z.object({
  note: z.string().max(2000, "Note can be at max 2000 characters.").optional(),
});
