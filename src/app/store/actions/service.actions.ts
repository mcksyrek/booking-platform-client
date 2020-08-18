import { IService } from '@booking/service/shared/service.interface';

export class AddServiceAction {
  static readonly type = '[SERVICE] Add';

  constructor(public readonly service: IService) {}
}
