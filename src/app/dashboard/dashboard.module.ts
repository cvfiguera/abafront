import { DashboardComponent } from './dashboard.component';
import { CommonAppModule } from './../common-app/common-app.module';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule, DataTableModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoSecComponent } from './estado-sec/estado-sec.component';
import { CalendarioSecComponent } from './calendario-sec/calendario-sec.component';
import { ResumenSecComponent } from './resumen-sec/resumen-sec.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, CommonAppModule, InputSwitchModule, DataTableModule
  ],
  exports: [ EstadoSecComponent, CalendarioSecComponent, ResumenSecComponent ],
  declarations: [EstadoSecComponent, CalendarioSecComponent, ResumenSecComponent, DashboardComponent]
})
export class DashboardModule { }
