import cron from "node-cron";
import { pingDatabases } from "./ping.js";

console.log("Supabase Pinger started");

// Run every two minutes
cron.schedule("*/2 * * * *", async () => {
	// console.log(`Running ping at ${new Date().toISOString()}`);
	await pingDatabases();
});

// Run once immediately on startup
await pingDatabases();
