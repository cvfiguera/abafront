import { AuthGuard } from './../common/auth.guard';
import { FeriadosComponent } from './feriados/feriados.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { FacturadorComponent } from './facturador/facturador.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { CargadorComponent } from './cargador/cargador.component';
import { ValidadorComponent } from './validador/validador.component';
import { Routes } from '@angular/router';

export const routesSLA: Routes = [
    { path: 'validacion',  component: ValidadorComponent, canActivate: [AuthGuard] },
    { path: 'carga',  component: CargadorComponent, canActivate: [AuthGuard] },
    { path: 'bitacora',  component: BitacoraComponent, canActivate: [AuthGuard] },
    { path: 'facturacion',  component: FacturadorComponent, canActivate: [AuthGuard] },
    { path: 'procesos',  component: ProcesosComponent, canActivate: [AuthGuard] },
    { path: 'feriados',  component: FeriadosComponent, canActivate: [AuthGuard] },
]