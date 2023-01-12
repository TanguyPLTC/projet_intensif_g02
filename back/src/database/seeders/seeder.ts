import { Injectable, Logger } from '@nestjs/common';

import { BuildingSeederService } from './building/building.service';
import { EnterpriseSeederService } from './enterprise/enterprise.service';

@Injectable()
export class Seeder {
  private readonly logger = new Logger(Seeder.name);

  constructor(
    private readonly enterpriseSeederService: EnterpriseSeederService,
    private readonly buildingSeederService: BuildingSeederService,
  ) {}

  async seed() {
    try {
      await this.enterprise();
      await this.building();
      this.logger.log('Seeding completed successfully');
    } catch (ex) {
      this.logger.error('Seeding failed');
      this.logger.error(ex.message, ex.stack);
    }
  }

  async enterprise() {
    try {
      const created = await this.enterpriseSeederService.create();
      const changes = created.filter(
        (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
      ).length;

      this.logger.log(`Enterprise (${changes}) seeding completed successfully`);
    } catch (ex) {
      this.logger.error('Enterprise seeding failed');
      this.logger.error(ex.message, ex.stack);
    }
  }

  async building() {
    try {
      const created = await this.buildingSeederService.create();
      const changes = created.filter(
        (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
      ).length;

      this.logger.log(`Building (${changes}) seeding completed successfully`);
    } catch (ex) {
      this.logger.error('Building seeding failed');
      this.logger.error(ex.message, ex.stack);
    }
  }
}
