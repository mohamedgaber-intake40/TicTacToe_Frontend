import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../services/notification.service';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InvitationDialogComponent} from './invitation-dialog/invitation-dialog.component';
import {InvitationService} from './services/invitation.service';

export interface DialogData {
  username: string;
}

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit,OnDestroy {
  notificationServicesSubscription:Subscription;
  invitation;
  dialogRef;
  constructor(private notificationService:NotificationService , private dialog:MatDialog,private invitationService:InvitationService) {
    this.notificationServicesSubscription = this.notificationService.invitationSubject.subscribe(invitation=>{
      console.log("notification recivied");
      this.invitation = invitation;
      this.openDialog();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.notificationServicesSubscription.unsubscribe();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(InvitationDialogComponent, {
      width: '500px',
      data: {username: "mohamed"}
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.invitationService.acceptInvitaion();
      }
    });
  }

}
