import { IService } from '@app/models/service.interface';

export class AddService {
  static readonly type = '[SERVICE] Add';

  constructor(public readonly service: IService) {}
}
