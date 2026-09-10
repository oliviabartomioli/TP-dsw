<<<<<<< HEAD
import { Module } from "@nestjs/common";
import { typeOrmConfig } from "./config/typeorm.config";
import { UsersModule } from "./modules/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfessionalModule } from "./modules/professional/professional.module";
import { ServicesModule } from "./modules/services/services.module";
import { CategoryModule } from "./modules/category/category.module";
import { CityModule } from "./modules/city/city.module";
import { ProvinceModule } from "./modules/province/province.module";
import { RequestModule } from "./modules/request/request.module";
=======
import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalModule } from './modules/professional/professional.module';
import { ServicesModule } from './modules/services/services.module';
import { CategoryModule } from './modules/category/category.module';
>>>>>>> parent of 141d88c (modulo request finalizado)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    ProfessionalModule,
    ServicesModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
