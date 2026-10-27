import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { reviewDto } from './dto/review-dto';
import { review } from './entity/review.entity';
import { request } from '../request/entity/request.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(review)
    private reviewRepository: Repository<review>,

    @InjectRepository(request)
    private requestRepository: Repository<request>,
  ) {}

  async createReview(reviewData: reviewDto) {
    const requestExists = await this.requestRepository.findOne({
      where: {
        idRequest: reviewData.idRequest,
        deleteRequest: false,
      },
    });

    if (!requestExists) {
      throw new NotFoundException('La solicitud seleccionada no existe');
    }

    if (requestExists.state !== 'completada') {
      throw new BadRequestException(
        'Solo se pueden valorar solicitudes completadas',
      );
    }

    const existingReview = await this.reviewRepository.findOne({
      where: {
        request: {
          idRequest: reviewData.idRequest,
        },
      },
    });

    if (existingReview) {
      throw new ConflictException('Esta solicitud ya tiene una valoración');
    }

    const newReview = this.reviewRepository.create({
      commentR: reviewData.commentR,
      rating: reviewData.rating,
      request: requestExists,
    });

    return await this.reviewRepository.save(newReview);
  }

  async findReview(idReview: number) {
    return await this.reviewRepository.findOne({ where: { idReview } });
  }
  async findAll() {
    return await this.reviewRepository.find({
      where: { deleteR: false },
      relations: {
        request: {
          user: true,
          service: {
            professional: true,
          },
        },
      },
    });
  }
  async findAllDelete() {
    return await this.reviewRepository.find({
      where: { deleteR: true },
      relations: {
        request: {
          user: true,
          service: {
            professional: true,
          },
        },
      },
    });
  }

  async updateReview(idReview: number, reviewData: reviewDto) {
    const reviewExists = await this.reviewRepository.findOne({
      where: { idReview },
      relations: { request: true },
    });

    if (!reviewExists) {
      throw new NotFoundException('La valoración no existe');
    }

    if (reviewExists.deleteR) {
      throw new ConflictException('La valoración está eliminada');
    }

    if (reviewExists.request?.idRequest !== reviewData.idRequest) {
      throw new BadRequestException(
        'No se puede cambiar la solicitud asociada a una valoración',
      );
    }

    reviewExists.commentR = reviewData.commentR;
    reviewExists.rating = reviewData.rating;

    return await this.reviewRepository.save(reviewExists);
  }

  async deleteReview(idReview: number) {
    const ReviewExists = await this.findReview(idReview);
    if (!ReviewExists) {
      throw new NotFoundException(
        'La reseña con id: ' + idReview + ' no existe',
      );
    }
    if (ReviewExists.deleteR) {
      throw new ConflictException(
        'La reseña con id ' + idReview + ' esta eliminada',
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
      throw new NotFoundException(
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
