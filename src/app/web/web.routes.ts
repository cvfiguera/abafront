import { AuthGuard } from './../common/auth.guard';
import { HomeComponent } from './../home/home.component';
import { ListaEsperaComponent } from './lista-espera/lista-espera.component';
import { TipoAdjComponent } from './tipo-adj/tipo-adj.component';
import { EstadosComponent } from './estados/estados.component';
import { ConcursosComponent } from './concursos/concursos.component';
import { TecnologiasComponent } from './tecnologias/tecnologias.component';
import { ContactosComponent } from './contactos/contactos.component';
import { RbdsComponent } from './rbds/rbds.component';
import { OperadorasComponent } from './operadoras/operadoras.component';
import { Routes } from '@angular/router';

export const routesWEB: Routes = [
    { path: 'operadoras',  component: OperadorasComponent, canActivate: [AuthGuard] },
    { path: 'rbds',  component: RbdsComponent, canActivate: [AuthGuard] },
    { path: 'rbds/:id/contactos', component: ContactosComponent, canActivate: [AuthGuard] },
    { path: 'tecnologias',  component: TecnologiasComponent, canActivate: [AuthGuard] },
    { path: 'concursos',  component: ConcursosComponent, canActivate: [AuthGuard] },
    { path: 'estados',  component: EstadosComponent, canActivate: [AuthGuard] },
    { path: 'tipos',  component: TipoAdjComponent, canActivate: [AuthGuard] },
    { path: 'tipos/:id/listas',  component: ListaEsperaComponent, canActivate: [AuthGuard] }
];