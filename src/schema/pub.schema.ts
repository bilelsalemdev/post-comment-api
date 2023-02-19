import { date, object } from "zod";
import { TypeOf, string } from "zod";
export const createPubSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),

    description: string({
      required_error: "description is required",
    }),
  }),
});

export type createPubInput = TypeOf<typeof createPubSchema>;
