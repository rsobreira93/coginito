import { Injectable } from '@nestjs/common';
import { Test } from './dtos/test.interface';

@Injectable()
export class TestService {
  listAllName(): Array<Test> {
    return [
      { name: 'José', description: 'Electric' },
      { name: 'Volpix', description: 'Fire' },
      { name: 'Flabébé', description: 'Fairy' },
    ];
  }
}
