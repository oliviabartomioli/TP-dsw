import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteDto } from './dto/favorite-dto';

@Controller('api/v1/favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Post('createFavorite')
  createFavorite(@Body() favorite: FavoriteDto) {
    return this.favoriteService.createFavorite(favorite);
  }
  @Get('/:idfav')
  getFavoriteByIdfav(@Param('idfav') idfav: number) {
    return this.favoriteService.findFavorite(idfav);
  }
  @Get()
  getFavorite() {
    return this.favoriteService.findAll();
  }
  @Get('delete/deleted')
  getFavoriteDelete() {
    return this.favoriteService.findAllDelete();
  }
  @Delete('/:idfav')
  deleteFavorite(@Param('idfav') idfav: number) {
    return this.favoriteService.deleteFavorite(idfav);
  }
  @Patch('/restore/:idfav')
  restoreFavorite(@Param('idfav') idfav: number) {
    return this.favoriteService.restoreFavorite(idfav);
  }
}
