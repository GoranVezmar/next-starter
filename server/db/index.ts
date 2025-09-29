import { envServer } from "@/config/server.env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(envServer.DATABASE_URL);
export const db = drizzle({ client: queryClient });
