import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CityService } from './city.service';
import { cityDto } from './dto/city-dto';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) {}
  @Post('createCity')
  createCity(@Body() city: cityDto) {
    return this.cityService.createCity(city);
  }
  @Get()
  getCities() {
    return this.cityService.findAll();
  }
  @Delete('/:nameCity')
  deleteCity(@Param('nameCity') nameCity: string) {
    return this.cityService.deleteCity(nameCity);
  }
  @Patch('/restore/:nameCity')
  restoreCity(@Param('nameCity') nameCity: string) {
    return this.cityService.restoreCity(nameCity);
  }
}
