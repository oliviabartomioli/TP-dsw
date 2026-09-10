import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { requestDto } from './dto/request-dto';

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}
  @Post('createRequest')
  createRequests(@Body() requests: requestDto) {
    return this.requestService.createRequests(requests);
  }
  @Get('/:idRequest')
  getRequestByIdRequest(@Param('idRequest') idRequest: number) {
    return this.requestService.findRequest(idRequest);
  }

}
