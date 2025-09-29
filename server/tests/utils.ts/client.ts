import { testClient as HonoTestClient } from "hono/testing";

import { type ApiRoutes, app } from "@/server/app";

export const testClient = HonoTestClient<ApiRoutes>(app);
