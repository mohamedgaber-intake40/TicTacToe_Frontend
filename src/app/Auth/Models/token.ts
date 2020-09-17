export class Token {
    constructor(
        public access_token: string,
        public expired_at: string,
        public type: string
    ) { }

    static createToken(data) {
        return new Token(data.access_token, data.expired_at, data.type);
    }

}
