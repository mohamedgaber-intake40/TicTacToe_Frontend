import {Token} from './token';

export class User {
    constructor(
        public name: string,
        public email: string,
        public token:Token
    ){}

    static createUser(data)
    {
        return new User(data.name,data.email,Token.createToken(data.token))
    }

    static createUserFromResponse(res)
    {
        return new User(res.data.user.name,res.data.user.email,Token.createToken(res.data.token))

    }


}
