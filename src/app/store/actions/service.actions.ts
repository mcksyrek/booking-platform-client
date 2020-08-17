import { IService } from '@app/models/service.interface';

export class AddService {
  static readonly type = '[SERVICE] Add';

  constructor(public payload: IService) {}
}
