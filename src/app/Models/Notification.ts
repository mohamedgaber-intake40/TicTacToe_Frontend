import {User} from '../Auth/Models/user';

export class Notification{
    constructor(public user:User,public type:string){}
}
