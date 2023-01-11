import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { IEnterprise } from 'src/enterprise/interfaces/enterprise.interface';
import { Repository } from 'typeorm';

import { words } from './data';

@Injectable()
export class EnterpriseSeederService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
  ) {}

  async create(): Promise<IEnterprise[]> {
    const changed: IEnterprise[] = [];

    for (const word of words) {
      const dbEnterprise = await this.enterpriseRepository.findOneBy({
        name: word.name,
      });

      if (!dbEnterprise) {
        changed.push(await this.enterpriseRepository.save(word));
      }
    }

    return changed;
  }
}
