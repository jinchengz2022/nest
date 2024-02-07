import { Injectable, Inject } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UniqueCodeEntity } from './uniqueCode.entities';
import { UniqueCodeService } from './unique-code.service';
import { ShortLongMap } from './short-long-map.entities';

@Injectable()
export class ShortLongMapService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject(UniqueCodeService)
  private uniqueCodeService: UniqueCodeService;

  async getLongUrl(code: string) {
    const map = await this.entityManager.findOneBy(ShortLongMap, {
      code: code,
    });

    if (!map) {
      return null;
    }

    return map.initCode;
  }

  async generate(initUrl: string) {
    let uniqueCode = await this.entityManager.findOneBy(UniqueCodeEntity, {
      state: '0',
    });
    console.log({ uniqueCode, initUrl });

    if (!uniqueCode) {
      uniqueCode = await this.uniqueCodeService.generateCode();
    }

    const newData = new ShortLongMap();
    newData.code = uniqueCode.code;
    newData.initCode = initUrl;

    await this.entityManager.insert(ShortLongMap, newData);
    await this.entityManager.update(
      UniqueCodeEntity,
      {
        id: uniqueCode.id,
      },
      {
        state: '1',
      },
    );

    return uniqueCode.code;
  }
}
