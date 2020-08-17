import { IService } from '@booking/models/service.interface';

export class AddServiceAction {
  static readonly type = '[SERVICE] Add';

  constructor(public readonly service: IService) {}
}
