import { AuthGuard } from './../common/auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RolesComponent } from './roles/roles.component';
import { Routes } from '@angular/router';

export const routesUsers: Routes = [
    { path: 'roles',  component: RolesComponent, canActivate: [AuthGuard] },
    { path: 'perfil',  component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'roles/:id/usuarios',  component: UsuariosComponent, canActivate: [AuthGuard] }
];

