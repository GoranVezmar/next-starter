import { hc } from "hono/client";

import type { ApiRoutes } from "@/server/app";

import { envClient } from "../config/client.env";

const client = hc<ApiRoutes>(envClient.NEXT_PUBLIC_CLIENT_URL);

export const api = client.api;
