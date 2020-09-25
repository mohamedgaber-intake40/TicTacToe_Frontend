import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { InvitationDialogComponent } from './invitation-dialog/invitation-dialog.component';
import { InvitationService } from './services/invitation.service';
import { GameService } from '../game/services/game.service';
import { Router } from '@angular/router';
import { Game } from '../game/models/Game';
import { LocalStorageService } from '../services/local-storage.service';
import { ConfirmationService } from 'primeng/api';
import { Notification } from '../Models/Notification';

export interface DialogData {
  username: string;
}

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css'],
})
export class InvitationComponent implements OnInit, OnDestroy {
  inviteNotificationSubscription: Subscription;
  acceptInvitationNotificationSubscription: Subscription;
  gameNotificationSubscription: Subscription;
  invitation: Notification;
  dialogRef;
  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private invitationService: InvitationService,
    private gameService: GameService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private confirmationService: ConfirmationService
  ) {
    this.inviteNotificationSubscription = this.notificationService.invitationSubject.subscribe(
      (invitation) => {
        this.invitation = invitation;
        this.openDialog();
      }
    );

    this.acceptInvitationNotificationSubscription = this.notificationService.acceptInvitationSubject.subscribe(
      (acceptInvitation) => {
        this.gameService.createGame(acceptInvitation.user.id).subscribe(
          (res) => {
            const game = new Game(
              res.data.game.id,
              this.localStorageService.getUser(),
              acceptInvitation.user
            );
            game.firstPlayer.symbol = 'x';
            game.secondPlayer.symbol = 'o';
            this.gameService.game = game;
            this.router.navigateByUrl(`game/${res.data.game.id}`);
          },
          (res) => {
            console.log(res);
          }
        );
      }
    );

    this.gameNotificationSubscription = this.notificationService.gameSubject.subscribe(
      (gameNotification) => {
        const game = gameNotification.game;
        game.firstPlayer.symbol = 'x';
        game.secondPlayer.symbol = 'o';
        this.gameService.game = game;
        this.router.navigateByUrl(`game/${gameNotification.game.id}`);
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.inviteNotificationSubscription.unsubscribe();
    this.acceptInvitationNotificationSubscription.unsubscribe();
    this.gameNotificationSubscription.unsubscribe();
  }

  openDialog() {
    // this.dialogRef = this.dialog.open(InvitationDialogComponent, {
    //   width: '500px',
    //   data: { username: 'mohamed' },
    // });

    this.confirmationService.confirm({
      message: `${this.invitation.user.name} invite you , agree?`,
      key: 'invitation',
      accept: () => {
        //Actual logic to perform a confirmation
        this.invitationService.acceptInvitation(this.invitation.user.id);
      },
    });

    // this.dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.invitationService.acceptInvitation(this.invitation.user.id);
    //   }
    // });
  }
}
