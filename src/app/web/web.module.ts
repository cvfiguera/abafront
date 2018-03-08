import { routesWEB } from './web.routes';
import { RouterModule } from '@angular/router';
import { CommonAppModule } from './../common-app/common-app.module';
import { FormsModule } from '@angular/forms';
import { RbdService } from './../services/rbd.service';
import { OperadoraService } from './../services/operadora.service';
import { ConfirmationService, GrowlModule, ConfirmDialogModule, DataTableModule } from 'primeng/primeng';
import { EstadoService } from './../services/estado.service';
import { ContactoService } from './../services/contacto.service';
import { ListaseFormComponent } from './listase-form/listase-form.component';
import { TipoAdjFormComponent } from './tipo-adj-form/tipo-adj-form.component';
import { ListaEsperaComponent } from './lista-espera/lista-espera.component';
import { TipoAdjComponent } from './tipo-adj/tipo-adj.component';
import { ContactosFormComponent } from './contactos-form/contactos-form.component';
import { ContactosComponent } from './contactos/contactos.component';
import { EstadosFormComponent } from './estados-form/estados-form.component';
import { EstadosComponent } from './estados/estados.component';
import { ConcursosFormComponent } from './concursos-form/concursos-form.component';
import { ConcursosComponent } from './concursos/concursos.component';
import { TecnologiasFormComponent } from './tecnologias-form/tecnologias-form.component';
import { TecnologiasComponent } from './tecnologias/tecnologias.component';
import { RbdsComponent } from './rbds/rbds.component';
import { OperadorasComponent } from './operadoras/operadoras.component';
import { OperadorasFormComponent } from './operadoras-form/operadoras-form.component';
import { RbdsFormComponent } from './rbds-form/rbds-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule, FormsModule, CommonAppModule, DataTableModule, GrowlModule, ConfirmDialogModule,
    RouterModule.forChild(routesWEB)
  ],
  declarations: [
    RbdsFormComponent, OperadorasFormComponent, OperadorasComponent,
    RbdsComponent, TecnologiasComponent, TecnologiasFormComponent,
    ConcursosComponent, ConcursosFormComponent, EstadosComponent,
    EstadosFormComponent, ContactosComponent, ContactosFormComponent,
    TipoAdjComponent, ListaEsperaComponent, TipoAdjFormComponent,
    ListaseFormComponent
  ],
  exports: [ RouterModule ],
  providers: [
    OperadoraService, RbdService, ConfirmationService, EstadoService, ContactoService
  ]
})
export class WebModule { }
