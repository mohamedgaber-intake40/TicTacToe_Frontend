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
import { MatDialogModule } from '@angular/material/dialog';
import { InvitationDialogComponent } from './invitation/invitation-dialog/invitation-dialog.component';
import { GameComponent } from './game/game.component';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import { BoardComponent } from './game/board/board.component';
import { CellComponent } from './game/board/cell/cell.component';

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
    GameComponent,
    BoardComponent,
    CellComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      AppRoutingModuleModule,
      BrowserAnimationsModule,
      MatSidenavModule,
      MatDialogModule,
      ButtonModule,
      SidebarModule
      // SidebarModule.forRoot()

  ],
  exports: [MatSidenavModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
