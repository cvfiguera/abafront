import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Message, ConfirmationService } from 'primeng/primeng';
import { Usuario } from './../../common/interfaces';
import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  titlePage: string;
  title: string;
  data: Usuario[];
  dataSource: Usuario[];
  usuario: Usuario;
  filtro;
  id: number;
  sistema:number;
  msgs: Message[] = [];
  constructor(private requestService: RequestService, private route: ActivatedRoute,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.titlePage = 'Usuarios';
    this.filtro = { rut: null, nombre: ''};
    this.usuario = { usuarioId: null, username: '', password: '', email: '', bloqueado: null,
                     intentos: null, intentosMax: null, rut: '',  telefono: '', organizacion: '',
                     nombre: '', apellido: '', rolId: this.id };
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.sistema = params['sistema'];
    });
    this.loadData();
  }

  private loadData() {
    let param: URLSearchParams = new URLSearchParams();
    param.append('sistema', this.sistema.toString());

    this.requestService.getAll(EndPoindsURL.roles + '/' + this.id + '/usuarios', param)
      .subscribe(
          response => {
            this.dataSource = this.data = response;
          }, error => {
            this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
          }
      );
  }

  loadDataFiltered(rutCtrl, nombreCtrl) {
    const rut = rutCtrl.value;
    const nombre = nombreCtrl.value;

    this.data = this.dataSource.filter(
      usuario => (usuario.rut.toUpperCase().indexOf(rut.toUpperCase()) != -1) &&
                 (usuario.nombre.toUpperCase().indexOf(nombre.toUpperCase()) != -1));
  }

  newRowData() {
    this.usuario = { usuarioId: null, username: '', password: '', email: '', bloqueado: null,
                     intentos: null, intentosMax: null, rut: '',  telefono: '', organizacion: '',
                     nombre: '', apellido: '', rolId: this.id };
    this.title = 'Nuevo Usuario';
  }

  editRowData(usuario: Usuario) {
    this.title = 'Editar Usuario';
    this.usuario = usuario;
  }

  deleteRowData(usuario: Usuario) {
    let param: URLSearchParams = new URLSearchParams();
    param.append('sistema', this.sistema.toString());
    this.confirmationService.confirm ({
      message: '¿Desea eliminar el registro?',
      accept: () => {
          this.requestService.delete(EndPoindsURL.roles + '/' + this.id + '/usuarios', usuario.usuarioId, param)
            .subscribe(
                response => {
                    this.msgs.push({ severity: 'success', summary: 'Borrado!', detail: 'Los datos han sido borrados.'});
                    this.loadData();
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
        setTimeout(() => this.msgs = [], 3000);
    } else {
      this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
      setTimeout(() => this.msgs = [], 3000);
    }
  }
}
