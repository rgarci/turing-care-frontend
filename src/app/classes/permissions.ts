export class UserToken {}
export class Permissions {
  canActivate(user: UserToken, id: string): boolean {
    return true;
  }
}
