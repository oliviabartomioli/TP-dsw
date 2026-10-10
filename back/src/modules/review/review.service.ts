import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { reviewDto } from './dto/review-dto';
import { review } from './entity/review.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(review)
    private reviewRepository: Repository<review>,
  ) {}

  async createReview(reviewData: reviewDto) {
    const newReview = this.reviewRepository.create({
      commentR: reviewData.commentR,
      rating: reviewData.rating,
    });

    return await this.reviewRepository.save(newReview);
  }

  async findReview(idReview: number) {
    return await this.reviewRepository.findOne({ where: { idReview } });
  }
  async findAll() {
    return await this.reviewRepository.find({ where: { deleteR: false } });
  }
  async findAllDelete() {
    return await this.reviewRepository.find({ where: { deleteR: true } });
  }

  async updateReview(idReview: number, reviewData: reviewDto) {
    const reviewExists = await this.findReview(idReview);

    if (!reviewExists) {
      throw new ConflictException(
        'La reseña con id ' + idReview + ' no existe',
      );
    }

    if (reviewExists.deleteR) {
      throw new ConflictException(
        'La reseña con id ' + idReview + ' está eliminada',
      );
    }

    reviewExists.commentR = reviewData.commentR;
    reviewExists.rating = reviewData.rating;

    return await this.reviewRepository.save(reviewExists);
  }

  async deleteReview(idReview: number) {
    const ReviewExists = await this.findReview(idReview);
    if (!ReviewExists) {
      throw new ConflictException('La reseña con id:' + idReview + 'no existe');
    }
    if (ReviewExists.deleteR) {
      throw new ConflictException(
        'La reseña con id' + idReview + 'esta eliminada',
      );
    }
    const rows: UpdateResult = await this.reviewRepository.update(
      { idReview },
      { deleteR: true },
    );
    return rows.affected == 1;
  }
  async restoreReview(idReview: number) {
    const ReviewExists = await this.findReview(idReview);

    if (!ReviewExists) {
      throw new ConflictException(
        'La reseña con idReview ' + idReview + ' no existe',
      );
    }
    if (!ReviewExists.deleteR) {
      throw new ConflictException('la reseña no esta eliminada');
    }

    const rows: UpdateResult = await this.reviewRepository.update(
      { idReview },
      { deleteR: false },
    );
    return rows.affected == 1;
  }
}
