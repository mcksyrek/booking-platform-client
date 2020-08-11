import { ServiceModel } from '../../models/service.model';

export class AddService {
  static readonly type = '[SERVICE] Add';

  constructor(public payload: ServiceModel) {}
}
