import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModuleModule } from './app-routing-module/app-routing-module.module';
import { NavComponent } from './nav/nav.component';
import { AuthInterceptor } from './Interceptor/auth.interceptor';
import { OnlineComponent } from './online/online.component';
import { FilterOnlinePipe } from './pipes/filter-online.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InvitationComponent } from './invitation/invitation.component';
import {MatDialogModule} from '@angular/material/dialog';
import { InvitationDialogComponent } from './invitation/invitation-dialog/invitation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    OnlineComponent,
    FilterOnlinePipe,
    InvitationComponent,
    InvitationDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModuleModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDialogModule

  ],
  exports: [MatSidenavModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
