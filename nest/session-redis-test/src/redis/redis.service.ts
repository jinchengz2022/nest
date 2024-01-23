import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }

  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (const k in obj) {
      await this.redisClient.hSet(key, k, obj[k]);
    }

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
