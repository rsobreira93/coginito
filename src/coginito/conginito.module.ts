import { Module } from '@nestjs/common';
import { TestController } from './coginito.controller';
import { TestService } from './coginito.service';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService],
})
export class CoginitoModule {}
