import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TestService } from './coginito.service';
import { Test } from './dtos/test.interface';

@Controller('api/v1/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  listAllPokemons(): Array<Test> {
    return this.testService.listAllName();
  }
}
