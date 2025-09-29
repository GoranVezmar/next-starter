import { exec } from "child_process";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const normalizeName = (name: string) => {
  return name
    .toLowerCase() // lowercase
    .replace(/\s+/g, "_") // spaces → underscores
    .replace(/-/g, "_") // dashes → underscores
    .replace(/[^a-z0-9_]/g, ""); // remove other invalid chars if needed
};

rl.question("Enter migration name: ", (answer) => {
  const normalized = normalizeName(answer.trim());

  if (!normalized) {
    console.error("Migration name cannot be empty or invalid after normalization.");
    rl.close();
    process.exit(1);
  }

  exec(`bunx drizzle-kit generate --name ${normalized}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating migration: ${error.message}`);
      rl.close();
      process.exit(1);
    }
    if (stderr) {
      console.error(stderr);
    }
    console.log(stdout);
    rl.close();
  });
});
