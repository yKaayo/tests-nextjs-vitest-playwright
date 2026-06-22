type Env = keyof typeof envConfigs;

const envConfigs = {
  production: { currentEnv: "production", databaseFile: "prod.db.sqlite3" },
  development: { currentEnv: "development", databaseFile: "dev.db.sqlite3" },
  test: { currentEnv: "test", databaseFile: "test.test.db.sqlite3" },
  e2e: { currentEnv: "e2e", databaseFile: "e2e.test.db.sqlite3" },
} as const;

export const checkEnv = (): Env => {
  const env = process.env.CURRENT_ENV;

  if (!env) throw new Error("Verify the .env file");

  if (!(env in envConfigs)) {
    throw new Error(`Invalid environment: ${env}`);
  }

  return env as Env;
};

export const getEnv = () => {
  const env = checkEnv();
  return envConfigs[env];
};
