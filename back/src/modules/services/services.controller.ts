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

@Controller('api/v1/services')
export class ServicesController {
  constructor(private ServicesService: ServicesService) {}
  @Post('createServices')
  createServices(@Body() services: ServicesDto) {
    return this.ServicesService.createServices(services);
  }
  @Get('/:idServicio')
  getServicesById(@Param('idServicio') idServicio: number) {
    return this.ServicesService.findServices(idServicio);
  }
  @Get()
  getServices() {
    return this.ServicesService.findAll();
  }
  @Get('delete/deleted')
  getServicesDelete() {
    return this.ServicesService.findAllDelete();
  }
  @Put()
  upDateServices(@Body() services: ServicesDto) {
    return this.ServicesService.upDateServices(services);
  }
  @Delete('/:idServicio')
  deleteServices(@Param('idServicio') idServicio: number) {
    return this.ServicesService.deleteServices(idServicio);
  }
  @Patch('/restore/:idServicio')
  restoreServices(@Param('idServicio') idServicio: number) {
    return this.ServicesService.restoreServices(idServicio);
  }
}
