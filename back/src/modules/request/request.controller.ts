import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { RequestService } from './request.service';
import { requestDto } from './dto/request-dto';

@Controller('api/v1/request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post('createRequest')
  createRequests(@Body() requests: requestDto) {
    return this.requestService.createRequests(requests);
  }

  @Get()
  getRequests() {
    return this.requestService.findAll();
  }

  @Get('delete/deleted')
  getRequestsDeleted() {
    return this.requestService.findAllDelete();
  }

  @Get('/:idRequest')
  getRequestByIdRequest(@Param('idRequest') idRequest: number) {
    return this.requestService.findRequest(idRequest);
  }

  @Put()
  updateRequests(@Body() requests: requestDto) {
    return this.requestService.updateRequests(requests);
  }

  @Delete('/:idRequest')
  deleteRequests(@Param('idRequest') idRequest: number) {
    return this.requestService.deleteRequests(idRequest);
  }

  @Patch('/restore/:idRequest')
  restoreRequests(@Param('idRequest') idRequest: number) {
    return this.requestService.restoreRequest(idRequest);
  }

  @Patch(':idRequest/state')
  changeRequestState(
    @Param('idRequest', ParseIntPipe) idRequest: number,
    @Body('state') state: string,
  ) {
    return this.requestService.changeRequestState(idRequest, state);
  }
}
