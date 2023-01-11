import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { EnterpriseService } from './enterprise.service';

@ApiTags('enterprise')
@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get all enterprise',
    operationId: 'getAllEnterprise',
  })
  public async getAllEnterprise(@Res() res: Response) {
    const enterprises = await this.enterpriseService.findAll();
    return res.status(HttpStatus.OK).json(enterprises);
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create as a new enterprise',
    operationId: 'create',
  })
  public async create(
    @Res() res: Response,
    @Body() enterpriseDto: CreateEnterpriseDto,
  ) {
    const enterprise = await this.enterpriseService.create(enterpriseDto);

    return res.status(HttpStatus.CREATED).json(enterprise);
  }
}
