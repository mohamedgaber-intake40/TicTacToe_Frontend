import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData, InvitationComponent} from '../invitation.component';

@Component({
  selector: 'app-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.css']
})
export class InvitationDialogComponent implements OnInit {


  ngOnInit(): void {
  }
  constructor(
      public dialogRef: MatDialogRef<InvitationComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
