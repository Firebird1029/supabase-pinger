import { createClient } from "@supabase/supabase-js";
import { readFile } from "fs/promises";

interface DatabaseConfig {
	name: string;
	supabase_url?: string;
	supabase_url_env?: string;
	supabase_key?: string;
	supabase_key_env?: string;
	table_name?: string;
	table_name_env?: string;
}

export async function pingDatabases(): Promise<void> {
	try {
		const configData = await readFile("./config.json", "utf-8");
		const configs: DatabaseConfig[] = JSON.parse(configData);
		const successfulDatabases: string[] = [];

		for (const config of configs) {
			const success = await pingDatabase(config);
			if (success) {
				successfulDatabases.push(config.name);
			}
		}

		console.log(`Successfully pinged databases: ${successfulDatabases.join(", ")}`);
	} catch (error) {
		console.error("Error pinging databases:", error);
	}
}

async function pingDatabase(config: DatabaseConfig): Promise<boolean> {
	try {
		const supabaseUrl =
			config.supabase_url || (config.supabase_url_env ? process.env[config.supabase_url_env] : undefined);
		const supabaseKey =
			config.supabase_key || (config.supabase_key_env ? process.env[config.supabase_key_env] : undefined);
		const tableName = config.table_name || (config.table_name_env ? process.env[config.table_name_env] : undefined);

		if (!supabaseUrl) {
			console.error(`Supabase URL not found for ${config.name}`);
			return false;
		}

		if (!supabaseKey) {
			console.error(`Supabase key not found for ${config.name}`);
			return false;
		}

		if (!tableName) {
			console.error(`Table name not found for ${config.name}`);
			return false;
		}

		const supabase = createClient(supabaseUrl, supabaseKey);

		const { data, error } = await supabase.from(tableName).select().limit(1);

		if (error) {
			console.error(`Error pinging ${config.name}:`, error.message);
			return false;
		}
		return true;
	} catch (error) {
		console.error(`Failed to ping ${config.name}:`, error);
		return false;
	}
}
