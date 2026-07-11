import { z } from "zod";

const contentTypes = ["image", "video", "article", "audio"] as const;

export const contentSchema = z.object({
  link: z.url({ error: "Please provide a valid URL." }),
  type: z.enum(contentTypes),
  title: z
    .string()
    .min(3, "Title must be atleast 3 characters.")
    .max(20, "Title can be at max 20 characters"),
  tags: z.array(z.string()).optional(),
});
