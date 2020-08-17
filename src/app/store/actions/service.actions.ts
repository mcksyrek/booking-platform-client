import { IService } from '@booking/models/service.interface';

export class AddService {
  static readonly type = '[SERVICE] Add';

  constructor(public readonly service: IService) {}
}
