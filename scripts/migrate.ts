import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { envServer } from "../config/server.env";
import drizzleConfig from "../drizzle.config";

(async () => {
  const migrationClient = postgres(envServer.DATABASE_URL, { max: 1, onnotice: () => {} });

  if (drizzleConfig.out === undefined) {
    console.error("❌ Migration folder is not defined in drizzle.config.ts");
  }

  await migrate(drizzle(migrationClient), { migrationsFolder: drizzleConfig.out! });
  console.log("Migrations completed");
  await migrationClient.end();
})();
