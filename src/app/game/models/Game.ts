import { User } from '../../Auth/Models/user';
import { Move } from './Move';

export class Game {
  constructor(
    public id: number,
    public firstPlayer: User,
    public secondPlayer: User,
    public moves: Move[] = [],
    public winner: User = null
  ) {}

  static create(data) {
    console.log(data);
    return new Game(
      data.id,
      User.createUser(data.first_player, false),
      User.createUser(data.second_player, false)
    );
  }
}
