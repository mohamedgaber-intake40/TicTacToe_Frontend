import { Component, Input, OnInit } from '@angular/core';
import { Move } from '../../models/Move';
import { MoveService } from '../../services/move.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Route,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Input() posX: number;
  @Input() posY: number;
  @Input() symbol: string;
  constructor(
    private moveService: MoveService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  onClick() {
    console.log('pressed');
    // console.log(this.route.paramMap);
    // console.log(this.route.snapshot.params);
    const gameId = this.route.snapshot.params['id'];
    const move = new Move(this.posX, this.posY, this.symbol);
    this.moveService.playMove(gameId, move).subscribe((res) => {
      console.log(res);
    });
  }
}
