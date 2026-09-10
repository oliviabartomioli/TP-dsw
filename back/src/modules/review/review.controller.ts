import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { reviewDto } from './dto/review-dto';

@Controller('review')
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
  @Delete('/:idReview')
  deleteReview(@Param('idReview') idReview: number) {
    return this.reviewService.deleteReview(idReview);
  }
  @Patch('/restore/:idReview')
  restoreReview(@Param('idReview') idReview: number) {
    return this.reviewService.restoreReview(idReview);
  }
}
