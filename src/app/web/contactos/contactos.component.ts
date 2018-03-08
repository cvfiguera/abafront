import { UtilService } from './../../services/util.service';
import { Contacto } from './../../common/interfaces';
import { ConfirmationService, Message } from 'primeng/primeng';
import { ContactoService } from './../../services/contacto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  id: number;
  title: string;
  titleAction: string;
  dataSource: Contacto[];
  data: Contacto[];
  msgs: Message[] = [];
  rows = 10;
  contacto: Contacto = { contactoId: null, nombre: '', cargo: '', telefono1: '', telefono2: '', email: '', fechaBaja: '', rbdId: null };

  constructor(private contactoService: ContactoService,
              private utilService: UtilService,
              private confirmationService: ConfirmationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.title = 'Contactos';
    this.route.params.subscribe(params => {
      this.id = + params['id'];
    });
    this.loadData();
  }

  loadData() {
    this.contactoService.getContactos(this.id)
      .subscribe(
          response => this.data = this.dataSource = response,
          error => {
            this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
          }
      );
  }

  loadDataFiltered(nombreCtrl, cargoCtrl) {
    const nombre: string = nombreCtrl.value;
    const cargo: string = cargoCtrl.value;

    this.data = this.dataSource.filter(
      contacto => contacto.nombre.toUpperCase().indexOf(nombre.toUpperCase()) != -1
                  && contacto.cargo.toUpperCase().indexOf(cargo.toUpperCase()) != -1)
  }

  newRowData() {
    this.titleAction = 'Nuevo Contacto';
  }

  editRowData(contacto: Contacto) {
    this.titleAction = 'Editar Concurso';
    this.contacto = contacto;
    this.contacto.fechaBaja = this.utilService.ConverDateToFormat(this.contacto.fechaBaja);
  }

  deleteRowData(contacto: Contacto) {
    this.confirmationService.confirm ({
      message: '¿Desea eliminar el registro?',
      accept: () => {
          this.contactoService.deleteContacto(this.id, contacto)
            .subscribe(
                response => {
                    this.msgs.push({ severity: 'success', summary: 'Borrado!', detail: 'Los datos han sido borrados.'});
                    this.dataSource = this.data = response;
                    setTimeout(() => this.msgs = [], 3000);
                }, error => {
                    this.msgs.push({ severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' });
                    setTimeout(() => this.msgs = [], 3000);
                }
            );
      }
    });
  }

  onClose(success: boolean) {
    if (success) {
      this.msgs.push(
        {
          severity: 'success',
          summary: 'Guardado!',
          detail: 'Los datos han sido guardados.'
        });
        this.loadData();
        this.reset();
        setTimeout(() => this.msgs = [], 3000);
    } else {
      this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
    }
  }

  private reset() {
    this.contacto = { contactoId: null, nombre: '', cargo: '', telefono1: '', telefono2: '', email: '', fechaBaja: '', rbdId: null };
  }
}
