import { routes } from './../app.routes';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideComponent } from './side/side.component';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule, RouterModule],
  declarations: [ MenuComponent, SideComponent, HeaderComponent, FooterComponent ],
  exports: [ MenuComponent, SideComponent, HeaderComponent, FooterComponent ]
})
export class LayoutModule { }
