export class SetTokenAction {
  static readonly type = '[Auth] Set token';

  constructor(public readonly token: string) {}
}
