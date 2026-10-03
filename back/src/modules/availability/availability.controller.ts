import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityDto } from './dto/availability-dto';

@Controller('api/v1/availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Post('createAvailability')
  createAvailability(@Body() availability: AvailabilityDto) {
    return this.availabilityService.createAvailability(availability);
  }

  @Get()
  getAvailability() {
    return this.availabilityService.findAll();
  }

  @Get('/:idAvailability')
  getAvailabilityById(
    @Param('idAvailability', ParseIntPipe) idAvailability: number,
  ) {
    return this.availabilityService.findOneAvailability(idAvailability);
  }

  @Put('/:idAvailability')
  upDateAvailability(
    @Param('idAvailability', ParseIntPipe) idAvailability: number,
    @Body() availability: AvailabilityDto,
  ) {
    return this.availabilityService.upDateAvailability(
      idAvailability,
      availability,
    );
  }

  @Delete('/:idAvailability')
  deleteAvailability(
    @Param('idAvailability', ParseIntPipe) idAvailability: number,
  ) {
    return this.availabilityService.deleteAvailability(idAvailability);
  }
}
