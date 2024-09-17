import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [ConfigModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
