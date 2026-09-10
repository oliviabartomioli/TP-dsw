<<<<<<< HEAD
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { RequestService } from "./request.service";
import { requestDto } from "./dto/request-dto";
=======
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { requestDto } from './dto/request-dto';
>>>>>>> parent of 141d88c (modulo request finalizado)

@Controller("request")
export class RequestController {
  constructor(private requestService: RequestService) {}
  @Post("createRequest")
  createRequests(@Body() requests: requestDto) {
    return this.requestService.createRequests(requests);
  }
  @Get("/:idRequest")
  getRequestByIdRequest(@Param("idRequest") idRequest: number) {
    return this.requestService.findRequest(idRequest);
  }
<<<<<<< HEAD
  @Get()
  getRequests() {
    return this.requestService.findAll();
  }
  @Put()
  updateRequests(@Body() requests: requestDto) {
    return this.requestService.updateRequests(requests);
  }
  @Delete("/:idRequest")
  deleteRequests(@Param("idRequest") idRequest: number) {
    return this.requestService.deleteRequests(idRequest);
  }
  @Patch("/restore/:idRequest")
  restoreRequests(@Param("idRequest") idRequest: number) {
    return this.requestService.restoreRequest(idRequest);
  }
=======

>>>>>>> parent of 141d88c (modulo request finalizado)
}
