import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  constructor(private httpClient: HttpClient) {}
  acceptInvitation(userId) {
    this.httpClient.get(`/api/invite/${userId}/accept`).subscribe((res) => {});
  }
}
