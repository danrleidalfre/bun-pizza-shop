import type {Config} from "drizzle-kit";
import {env} from "./src/db/env.ts";

export default {
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL
  }
} satisfies Config;