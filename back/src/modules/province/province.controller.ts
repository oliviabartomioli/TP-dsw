import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ProvinceService } from "./province.service";
import { provinceDto } from "./dto/province-dto";

@Controller("province")
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}
  @Post("createProvince")
  createProvince(@Body() province: provinceDto) {
    return this.provinceService.createProvince(province);
  }
  @Get()
  getProvinces() {
    return this.provinceService.findAll();
  }
  @Patch("/restore/:nameProvince")
  restoreProvince(@Param("nameProvince") nameProvince: string) {
    return this.provinceService.restoreProvince(nameProvince);
  }

  @Delete("/:nameProvince")
  deleteProvince(@Param("nameProvince") nameProvince: string) {
    return this.provinceService.deleteProvince(nameProvince);
  }
}
