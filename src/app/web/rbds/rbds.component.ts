import { Router } from '@angular/router';
import { FiltroService } from './../../services/filtro.service';
import { RbdService } from './../../services/rbd.service';
import { Rbd, RegionSet, Comuna, RbdFiltro } from './../../common/interfaces';
import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { DataTable, Column, LazyLoadEvent, FilterMetadata, Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'rbds',
  templateUrl: './rbds.component.html',
  styleUrls: ['./rbds.component.css']
})
export class RbdsComponent implements OnInit {
  titlePage: String = 'Escuelas | Rbds';
  titleAction: String;
  filtro: RbdFiltro = { rbd: '', nombre: '', region: '', comuna: '' };
  @ViewChild(DataTable) dataTable: DataTable;
  @ViewChild(NgForm) rbdsForm: NgForm;
  msgs: Message[] = [];
  rows= 10;
  data: Rbd[];
  options: any;
  totalRecords: number;
  rbd: Rbd = {
       rbdId: null,
       rbd: null,
       nombre: null,
       direccion: null,
       nAlumnos: null,
       observacion: null,
       comuna: {comunaId: null, numero: null, nombre: null, region: { regionId: null, numero: null, nombre: null}}
  };
  regiones: RegionSet[];
  region: RegionSet = { regionId: null, numero: null, nombre: null, comunas: null };
  regionSel: RegionSet = { regionId: null, numero: null, nombre: null, comunas: null };
  
  constructor(private rbdService: RbdService, private router: Router,
              private filtroService: FiltroService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.filtroService.getRegiones()
      .subscribe(
        response => {
          this.regiones = response.content;
      }, error => {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          setTimeout(() => { this.msgs = []; }, 3000);
     });
  }

  change(sel) {
    if (sel.value == '') {
      this.region = { regionId: null, numero: null, nombre: null, comunas: null };
      this.filtro.region = '';
      this.filtro.comuna = '';
    } else {
      this.region = this.regiones.find( act => act.regionId == sel.value);
    }
  }

  private loadData () {
    this.rbdService.getRbds(this.options, this.filtro)
    .subscribe(
        response => {
          this.data = response.content;
          this.totalRecords = response.totalElements;
        }, error => {
            this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
        }
    );
  }

  loadDataFiltered() {
      this.options = {
      first: 0,
      rows: 10,
      sortField: 'rbd',
      sortOrder: 'asc'
    };
    this.loadData();
  }

  loadDataLazy(event: LazyLoadEvent) {
    this.options = {
      first: event.first,
      rows: event.rows,
      sortField: event.sortField === null ? 'rbd' : event.sortField,
      sortOrder: event.sortOrder === 1 ? 'asc' : 'desc'
    };
    this.loadData();
  }

  newRowData() {
    this.rbd = {
      rbdId: null,
      rbd: null,
      nombre: null,
      direccion: null,
      nAlumnos: null,
      observacion: null,
      comuna: {comunaId: null, numero: null, nombre: null, region: { regionId: null, numero: null, nombre: null}}
    };
    this.titleAction = 'Nuevo RBD';
  }

  getContactos(rbd: Rbd) {
    this.router.navigate(['/web/rbds/' + rbd.rbdId + '/contactos']);
  }

  editRowData(rbd: Rbd) {
    this.titleAction = 'Editar RBD';
    this.rbd = rbd;
    this.regionSel = this.regiones.find( act => act.regionId == rbd.comuna.region.regionId);
  }

  deleteRowData(rbd: Rbd) {
    this.confirmationService.confirm({
          message: '¿Desea eliminar el registro?',
          accept: () => {
            this.rbdService.deleteRbd(rbd)
                .subscribe( response => {
                  this.msgs.push(
                      {
                        severity: 'success',
                        summary: 'Borrado!',
                        detail: 'Los datos han sido borrados.'
                      });
                      this.data = response.content;
                      this.totalRecords = response.totalElements;
                      this.reset();
                }, error => {
                    this.data = error.content;
                    this.totalRecords = error.totalElements;
                    this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
                    setTimeout(() => { this.msgs = []; }, 3000);
                });
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
          this.reset();
      } else {
        this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
        setTimeout(() => { this.msgs = []; }, 3000);
      }
  }

  private reset() {
    this.dataTable.reset();
    this.rbdsForm.reset();
    this.filtro = { rbd: '', nombre: '', region: '', comuna: '' };
    setTimeout(() => { this.msgs = []; }, 3000);
  }
}
