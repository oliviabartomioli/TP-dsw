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
import { ProfessionalService } from './professional.service';
import { professionalDto } from './dto/professional-dto';

@Controller('api/v1/professional')
export class ProfessionalController {
  constructor(private ProfessionalService: ProfessionalService) {}

  @Post('createProfessional')
  createUser(@Body() professional: professionalDto) {
    return this.ProfessionalService.createProfessional(professional);
  }
  @Get('/:dniP')
  getProfessionalByDniP(@Param('dniP') dniP: number) {
    return this.ProfessionalService.findProfessional(dniP);
  }
  @Get()
  getProfessional() {
    return this.ProfessionalService.findAll();
  }
  @Get('delete/deleted')
  getProfessionalDelete() {
    return this.ProfessionalService.findAllDelete();
  }
  @Put()
  upDateProfessional(@Body() professional: professionalDto) {
    return this.ProfessionalService.upDateProfessional(professional);
  }
  @Delete('/:dniP')
  deleteProfessional(@Param('dniP') dniP: number) {
    return this.ProfessionalService.deleteProfessional(dniP);
  }
  @Patch('/restore/:dniP')
  restoreProfessional(@Param('dniP') dniP: number) {
    return this.ProfessionalService.restoreProfessional(dniP);
  }
}
