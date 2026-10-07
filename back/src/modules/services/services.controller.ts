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

import { ServicesService } from './services.service';
import { ServicesDto } from './dto/services-dto';
import { CreateServicesDto } from './dto/create-services-dto';

@Controller('api/v1/services')
export class ServicesController {
  constructor(private ServicesService: ServicesService) {}

  @Post('createServices')
  createServices(@Body() services: CreateServicesDto) {
    return this.ServicesService.createServices(services);
  }

  @Get()
  getServices() {
    return this.ServicesService.findAll();
  }

  @Get('delete/deleted')
  getServicesDelete() {
    return this.ServicesService.findAllDelete();
  }

  @Get('category/:idCategory')
  getServicesByCategory(@Param('idCategory') idCategory: number) {
    return this.ServicesService.findByCategory(idCategory);
  }

  @Get('city/:idCity')
  getServicesByCity(@Param('idCity') idCity: number) {
    return this.ServicesService.findByCity(idCity);
  }

  @Get('/:idServicio')
  getServicesById(@Param('idServicio') idService: number) {
    return this.ServicesService.findServices(idService);
  }

  @Put()
  upDateServices(@Body() services: ServicesDto) {
    return this.ServicesService.upDateServices(services);
  }

  @Delete('/:idServicio')
  deleteServices(@Param('idServicio') idService: number) {
    return this.ServicesService.deleteServices(idService);
  }

  @Patch('/restore/:idServicio')
  restoreServices(@Param('idServicio') idService: number) {
    return this.ServicesService.restoreServices(idService);
  }
}
