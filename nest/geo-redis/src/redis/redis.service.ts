import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { AddPosDto } from './dto/addPos.dto';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async addPos(params: AddPosDto) {
    return await this.redisClient.geoAdd('positions', {
      longitude: params.longitude,
      latitude: params.latitude,
      member: params.name,
    });
  }

  async getPos(key: string, posName: string) {
    const res = await this.redisClient.geoPos(key, posName);

    if (res) {
      return {
        name: posName,
        longitude: res[0].longitude,
        latitude: res[0].latitude,
      };
    }

    return false;
  }

  async getPosList(key: string) {
    const positions = await this.redisClient.zRange(key, 0, -1);

    const list = [];

    for (let i = 0; i < positions.length; i++) {
      const item = positions[i];
      const res = await this.getPos(key, item);
      list.push(res);
    }

    return list;
  }

  async searchNearBy(key: string, pos: [string, string], radius: number) {
    const positions = await this.redisClient.geoRadius(
      key,
      {
        longitude: pos[0],
        latitude: pos[1],
      },
      radius,
      'km',
    );

    const list = [];

    for (let i = 0; i < positions.length; i++) {
      const item = positions[i];
      const res = await this.getPos(key, item);
      list.push(res);
    }

    return list;
  }
}
