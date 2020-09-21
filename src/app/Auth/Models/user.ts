import { Token } from './token';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public token: Token = null,
    public score: number = null,
    public symbol: string = null
  ) {}

  static createUser(data, withToken: boolean) {
    if (withToken)
      return new User(
        data.id,
        data.name,
        data.email,
        Token.createToken(data.token)
      );
    return new User(data.id, data.name, data.email);
  }

  static createUserFromResponse(res) {
    return new User(
      res.data.user.id,
      res.data.user.name,
      res.data.user.email,
      Token.createToken(res.data.token)
    );
  }
  static createUsers(users) {
    let usersArr = [];
    users.forEach((user) => {
      usersArr.push(User.createUser(user, false));
    });
    return usersArr;
  }
}
