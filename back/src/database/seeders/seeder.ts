import { Injectable, Logger } from '@nestjs/common';

import { EnterpriseSeederService } from './enterprise/enterprise.service';

@Injectable()
export class Seeder {
  private readonly logger = new Logger(Seeder.name);

  constructor(
    private readonly enterpriseSeederService: EnterpriseSeederService,
  ) {}

  async seed() {
    try {
      const completed = await this.enterprise();
      this.logger.log('Seeding completed successfully');
      return completed;
    } catch (ex) {
      this.logger.error('Seeding failed');
      this.logger.error(ex.message, ex.stack);
    }
  }

  async enterprise() {
    try {
      const createdEnterprises = await this.enterpriseSeederService.create();
      const changes = createdEnterprises.filter(
        (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
      ).length;

      this.logger.log(`Enterprise (${changes}) seeding completed successfully`);
    } catch (ex) {
      this.logger.error('Enterprise seeding failed');
      this.logger.error(ex.message, ex.stack);
    }
  }
}
