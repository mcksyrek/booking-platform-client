export class SetSessionDataAction {
  static readonly type = '[Auth] Set session data';

  constructor(
    public readonly token: string,
    public readonly username: string
  ) {}
}

export class RemoveSessionDataAction {
  static readonly type = '[Auth] Remove session data';
}
