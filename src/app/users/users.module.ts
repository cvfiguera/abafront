import { RouterModule } from '@angular/router';
import { routesUsers } from './users.routes';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { CommonAppModule } from './../common-app/common-app.module';
import { FormsModule } from '@angular/forms';
import { RequestService } from './../services/request.service';
import { ConfirmationService, DataTableModule, GrowlModule, ConfirmDialogModule } from 'primeng/primeng';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, CommonAppModule, DataTableModule, GrowlModule, ConfirmDialogModule,
    RouterModule.forChild(routesUsers)
  ],
  declarations: [
    UsuariosComponent, RolesComponent, RolesFormComponent, UsuariosFormComponent, PerfilComponent
  ],
  exports: [ RouterModule ],
  providers: [
    ConfirmationService, RequestService
  ]
})
export class UsersModule { }
