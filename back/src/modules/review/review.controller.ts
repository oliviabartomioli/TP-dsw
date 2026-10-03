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

import { ReviewService } from './review.service';
import { reviewDto } from './dto/review-dto';

@Controller('api/v1/review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('createReview')
  createReview(@Body() review: reviewDto) {
    return this.reviewService.createReview(review);
  }

  @Get()
  getReview() {
    return this.reviewService.findAll();
  }

  @Get('delete/deleted')
  getReviewDeleted() {
    return this.reviewService.findAllDelete();
  }

  @Get('/:idReview')
  getReviewById(@Param('idReview') idReview: number) {
    return this.reviewService.findReview(idReview);
  }

  @Put()
  updateReview(@Body() review: reviewDto) {
    return this.reviewService.updateReview(review);
  }

  @Delete('/:idReview')
  deleteReview(@Param('idReview') idReview: number) {
    return this.reviewService.deleteReview(idReview);
  }

  @Patch('/restore/:idReview')
  restoreReview(@Param('idReview') idReview: number) {
    return this.reviewService.restoreReview(idReview);
  }
}
