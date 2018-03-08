import { routesSLA } from './sla.routes';
import { RouterModule } from '@angular/router';
import { DataTableModule, GrowlModule, ProgressBarModule, InputSwitchModule, ScheduleModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { ProcesosService } from './../services/procesos.service';
import { FeriadoService } from './../services/feriado.service';
import { ArchivoService } from './../services/archivos.service';
import { CommonAppModule } from './../common-app/common-app.module';
import { ProcesosComponent } from './procesos/procesos.component';
import { FeriadosFormComponent } from './feriados-form/feriados-form.component';
import { FeriadosComponent } from './feriados/feriados.component';
import { ValidadorComponent } from './validador/validador.component';
import { CargadorComponent } from './cargador/cargador.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { FacturadorComponent } from './facturador/facturador.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule, FormsModule, CommonAppModule, DataTableModule, GrowlModule, ProgressBarModule,
    InputSwitchModule, ScheduleModule, RouterModule.forChild(routesSLA)
  ],
  declarations: [
    FacturadorComponent, BitacoraComponent, CargadorComponent, ValidadorComponent,
    ProcesosComponent, FeriadosComponent, FeriadosFormComponent
  ],
  exports: [ RouterModule ],
  providers: [
    ArchivoService, FeriadoService, ProcesosService ]
})
export class SlaModule { }
