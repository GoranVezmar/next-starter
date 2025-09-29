import { z } from "zod";

import { userSelectSchema } from "../db/schemas/auth.schema";

export const userSchema = userSelectSchema;

export type User = z.infer<typeof userSchema>;
