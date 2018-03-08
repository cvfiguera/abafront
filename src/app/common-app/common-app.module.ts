import { SideComponent } from './../layout/side/side.component';
import { FooterComponent } from './../layout/footer/footer.component';
import { HeaderComponent } from './../layout/header/header.component';
import { MenuComponent } from './../layout/menu/menu.component';
import { RequestService } from './../services/request.service';
import { UtilService } from './../services/util.service';
import { ConfirmationService } from 'primeng/primeng';
import { FiltroService } from './../services/filtro.service';
import { HeaderPageComponent } from './header-page/header-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderPageComponent
  ],
  exports: [
    HeaderPageComponent],
  providers: [
    FiltroService, ConfirmationService, UtilService, RequestService ]
})
export class CommonAppModule { }
