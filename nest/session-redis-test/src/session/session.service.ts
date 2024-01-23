import { Injectable, Inject } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SessionService {
  @Inject(RedisService)
  private redisService: RedisService;

  generateSid() {
    return Math.random().toString().slice(2, 12);
  }

  async setSession(sid: string, value: Record<string, any>, ttl = 30 * 60) {
    if (!sid) {
      sid = this.generateSid();
    }

    await this.redisService.hashSet(`sid_${sid}`, value, ttl);

    return sid;
  }

  async getSession<SeesionType extends Record<string, any>>(
    sid: string,
  ): Promise<SeesionType>;
  async getSession(sid: string) {
    return await this.redisService.hashGet(`sid_${sid}`);
  }
}
