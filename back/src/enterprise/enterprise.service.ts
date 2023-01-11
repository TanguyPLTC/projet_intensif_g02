import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { Enterprise } from './entities/enterprise.entity';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
  ) {}

  public async findAll(): Promise<Enterprise[]> {
    return await this.enterpriseRepository.find();
  }

  public async create(enterpriseDto: CreateEnterpriseDto): Promise<Enterprise> {
    return await this.enterpriseRepository.save(enterpriseDto);
  }
}
