import { RedisOptions } from "ioredis";

interface ICacheConfig {
  drivers: string;
  config: {
    redis: RedisOptions;
  };
}

export default {
  drivers: "redis",

  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;
