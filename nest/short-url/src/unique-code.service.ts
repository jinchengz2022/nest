import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { generateRandomStr } from './utils';
import { UniqueCodeEntity } from './uniqueCode.entities';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UniqueCodeService {
  @InjectEntityManager()
  private uniqueCodeEntity: EntityManager;

  //   @Cron(CronExpression.EVERY_5_SECONDS)
  async generateCode() {
    const str = generateRandomStr(6);

    const uniqueCode = await this.uniqueCodeEntity.findOneBy(UniqueCodeEntity, {
      code: str,
    });

    if (!uniqueCode) {
      const code = new UniqueCodeEntity();
      code.code = str;
      code.state = '0';

      return await this.uniqueCodeEntity.insert(UniqueCodeEntity, code);
    } else {
      return this.generateCode();
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async batchGenerateCode() {
    for (let k = 0; k < 1000; k++) {
      await this.generateCode();
    }
  }
}
