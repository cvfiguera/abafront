import { AuthGuard } from './../common/auth.guard';
import { FPromediosComponent } from './f-promedios/f-promedios.component';
import { FRbdsComponent } from './f-rbds/f-rbds.component';
import { FOperadorasComponent } from './f-operadoras/f-operadoras.component';
import { Routes } from '@angular/router';

export const routesFacturaciones: Routes = [
    { path: 'operadoras',  component: FOperadorasComponent, canActivate: [AuthGuard] },
    { path: 'rbds',  component: FRbdsComponent, canActivate: [AuthGuard] },
    { path: 'promedios',  component: FPromediosComponent, canActivate: [AuthGuard] }
]