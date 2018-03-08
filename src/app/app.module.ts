import { HomeComponent } from './home/home.component';
import { LayoutModule } from './layout/layout.module';
import { FacturacionesModule } from './facturaciones/facturaciones.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DefaultHeaders } from './common/header.default';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './common/auth.guard';
import { routes } from './app.routes';
import { CommonAppModule } from './common-app/common-app.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderLoginComponent } from './layout/header-login/header-login.component';
import { LoginComponent } from './login/login.component';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { WebModule } from './web/web.module';
import { SlaModule } from './sla/sla.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { App } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    App, LoginComponent, HeaderLoginComponent, HomeComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, HttpModule,
    SlaModule, CommonAppModule, WebModule, UsersModule, TicketsModule, DashboardModule,
    FacturacionesModule, LayoutModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard, AuthService, DefaultHeaders, [{provide: LocationStrategy, useClass: HashLocationStrategy}]
  ],
  bootstrap: [App]
})
export class AppModule { }
