import { seed } from "drizzle-seed";

import { db } from "@/server/db";
import { user } from "@/server/db/schemas/auth.schema";

async function main() {
  console.log("🌱 Starting seed...");

  await seed(db, { user }).refine((fn) => ({
    user: {
      columns: {
        image: fn.valuesFromArray({
          values: ["https://example.com/image1.jpg", "https://example.com/image2.jpg", "https://example.com/image3.jpg"],
        }),
      },
    },
  }));

  console.log("✅ Seed completed.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
