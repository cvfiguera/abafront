import { URLSearchParams } from '@angular/http';
import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Rol } from './../../common/interfaces';
import { Message, ConfirmationService } from 'primeng/primeng';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  titlePage: string;
  title: string;
  msgs: Message[] = [];
  dataSource: any[] = [];
  data: any[] = [];
  sistema: number;
  rol: Rol;
  cols: any;
  tipo: number;
  endPoindUrl: string;
  constructor(private router: Router, private requestService: RequestService,
              private confirmationService: ConfirmationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sistema = null;
    this.loadData();
    this.route.params.subscribe(params => {
      if (params['sistema']) {
        this.sistema = params['sistema'];
        this.tipo = 2;
    } else
        this.tipo = 1;
    });
    this.titlePage = 'Roles de usuario por sistema';
    this.rol = { rolId: null, nombre: '', descripcion: '' };
    if (this.tipo == 1) {
      this.cols = [
        { field: 'nombre', header: 'Nombre Sistema', sortable: 'false' },
        { field: 'nombre', header: 'Descripción', sortable: 'false' }
      ];
    } else {
      this.data = this.dataSource.find(sistema => sistema.id == this.sistema);
      this.cols = [
        {field: 'nombre', header: 'Nombre Rol' },
        {field: 'descripcion', header: 'Descripción' }
      ];
    }
    
  }

  private loadData() {
    this.requestService.getAll(EndPoindsURL.roles)
      .subscribe(
          response => {
            if (this.tipo == 1)
              this.dataSource = this.data = response;
            else {
              this.dataSource = response;
              this.data = this.dataSource.find(
                sistema => sistema.id == this.sistema).roles;
            }
          }, error => {
            this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
          }
      );
  }

  private getUsuarios(rol: Rol) {
    this.router.navigate(['/usuario/roles/' + rol.rolId + '/usuarios', {sistema: this.sistema}]);
  }

  private getRoles(sistema: any) {
    this.sistema = sistema.id;
    this.data = sistema.roles;
    this.tipo = 2;
    this.cols = [
      {field: 'nombre', header: 'Nombre Rol' },
      {field: 'descripcion', header: 'Descripción' }
    ];
  }

  private getSistemas() {
    this.data = this.dataSource;
    this.cols = [
      { field: 'nombre', header: 'Nombre Sistema', sortable: 'false' },
      { field: 'nombre', header: 'Descripción', sortable: 'false' }
    ];
    this.sistema = null;
    this.tipo = 1;
  }

  loadDataFiltered(nombreCtrl) {
    const nombre: string = nombreCtrl.value;
    this.data = this.dataSource.filter(
      rol => rol.nombre.toUpperCase().indexOf(nombre.toUpperCase()) != -1);
  }

  newRowData() {
    this.rol = { rolId: null, nombre: '', descripcion: '' };
    this.title = 'Nuevo Rol';
  }

  editRowData(rol: Rol) {
    this.title = 'Editar Rol';
    this.rol = rol;
  }

  deleteRowData(rol: Rol) {
    this.confirmationService.confirm ({
      message: '¿Desea eliminar el registro?',
      accept: () => {
          let param: URLSearchParams = new URLSearchParams();
          param.append('sistema', this.sistema.toString());
          this.requestService.delete(EndPoindsURL.roles, rol.rolId, param)
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
    }
  }
}
