import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { ProvinceService } from './province.service';
import { provinceDto } from './dto/province-dto';

@Controller('api/v1/province')
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  @Post('createProvince')
  createProvince(@Body() province: provinceDto) {
    return this.provinceService.createProvince(province);
  }

  @Get()
  getProvinces() {
    return this.provinceService.findAll();
  }

  @Get('delete/deleted')
  getProvincesDeleted() {
    return this.provinceService.findAllDeleted();
  }

  @Put()
  updateProvince(@Body() province: provinceDto) {
    return this.provinceService.updateProvince(province);
  }

  @Delete('/:nameProvince')
  deleteProvince(@Param('nameProvince') nameProvince: string) {
    return this.provinceService.deleteProvince(nameProvince);
  }

  @Patch('/restore/:nameProvince')
  restoreProvince(@Param('nameProvince') nameProvince: string) {
    return this.provinceService.restoreProvince(nameProvince);
  }
}
