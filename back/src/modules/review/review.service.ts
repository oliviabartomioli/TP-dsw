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
  async createReview(review: reviewDto) {
    const ReviewExists = await this.findReview(review.idReview);
    if (ReviewExists) {
      throw new ConflictException('reseña ya registrada.');
    } else {
      return await this.reviewRepository.save(review);
    }
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
