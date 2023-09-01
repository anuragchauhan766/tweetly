import * as z from "zod";

export const Tweetschema = z.object({
  content: z.string().min(1, { message: "Tweet should not be empty" }).max(120),
});
