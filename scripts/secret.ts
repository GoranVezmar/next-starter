import crypto from "crypto";

// Generate a random 32-byte secret
const secret = crypto.randomBytes(32).toString("hex");
console.log(secret);
