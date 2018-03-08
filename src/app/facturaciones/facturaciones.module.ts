import { DataTableModule, ChartModule } from 'primeng/primeng';
import { LayoutModule } from './../layout/layout.module';
import { routesFacturaciones } from './facturaciones.routes';
import { RouterModule } from '@angular/router';
import { CommonAppModule } from './../common-app/common-app.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FOperadorasComponent } from './f-operadoras/f-operadoras.component';
import { FRbdsComponent } from './f-rbds/f-rbds.component';
import { FPromediosComponent } from './f-promedios/f-promedios.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, CommonAppModule, LayoutModule, DataTableModule, ChartModule,
    RouterModule.forChild(routesFacturaciones)
  ],
  exports: [RouterModule],
  declarations: [FOperadorasComponent, FRbdsComponent, FPromediosComponent]
})
export class FacturacionesModule {


}
