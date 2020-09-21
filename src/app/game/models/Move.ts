export class Move {
  constructor(
    public posX: number,
    public posY: number,
    public symbol: string
  ) {}

  static create(data) {
    return new Move(data.pos_x, data.pos_y, data.symbol);
  }
}
