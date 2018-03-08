import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './common/auth.guard';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '',  redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',  component: DashboardComponent },
      {
        path: 'sla',
        loadChildren: './sla/sla.module#SlaModule'
      },
      {
        path: 'facturaciones',
        loadChildren: './facturaciones/facturaciones.module#FacturacionesModule'
      },
      {
        path: 'web',
        loadChildren: './web/web.module#WebModule'
      },
      {
        path: 'tickets',
        loadChildren: './tickets/tickets.module#TicketsModule'
      },
      {
        path: 'usuario',
        loadChildren: './users/users.module#UsersModule'
      }
    ] },
    { path: 'login',  component: LoginComponent },
    { path: '**',  redirectTo: '' }
]