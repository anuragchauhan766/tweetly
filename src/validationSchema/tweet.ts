import * as z from "zod";

export const Tweetschema = z.object({
  content: z.string().max(180),
});
