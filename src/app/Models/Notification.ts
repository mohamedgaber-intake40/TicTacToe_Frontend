import { User } from '../Auth/Models/user';
import { Move } from '../game/models/Move';

export class Notification {
  constructor(public user: User, public type: string) {}
}

export class GameNotification extends Notification {
  constructor(public user: User, public type: string, public game) {
    super(user, type);
  }
}

// }
