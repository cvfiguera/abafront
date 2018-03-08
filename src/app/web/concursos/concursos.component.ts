import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { UtilService } from './../../services/util.service';
import { Concurso } from './../../common/interfaces';
import { DataTable, Message, ConfirmationService } from 'primeng/primeng';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'concursos',
  templateUrl: './concursos.component.html',
  styleUrls: ['./concursos.component.css']
})
export class ConcursosComponent implements OnInit {
  titlePage: string = 'Concursos';
  titleAction: string;
  @ViewChild(DataTable) dataTable: DataTable;
  msgs: Message[] = [];
  rows= 10;
  data: Concurso[];
  dataSource: Concurso[];
  concurso: Concurso = { concursoId: null, nombre: '', fechaInicio: '', fechaTermino: '', comentarios: ''};

  constructor(private concursoService: RequestService, private utilService: UtilService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData () {
      this.concursoService.getAll(EndPoindsURL.concursos)
      .subscribe(
          response => {
            this.data = this.dataSource = response;
          }, error => {
            this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
          }
    );
  }

  loadDataFiltered(nombre) {
    const text: string = nombre.value;
    this.data = this.dataSource.filter(concurso => concurso.nombre.toLocaleUpperCase().indexOf(text.toLocaleUpperCase()) != -1);
  }

  newRowData() {
    this.titleAction = 'Nuevo Concurso';
  }

  editRowData(concurso: Concurso) {
    this.titleAction = 'Editar Concurso';
    this.concurso = concurso;
    this.concurso.fechaInicio = this.utilService.ConverDateToFormat(this.concurso.fechaInicio);
    this.concurso.fechaTermino = this.utilService.ConverDateToFormat(this.concurso.fechaTermino);
  }

  deleteRowData(concurso: Concurso) {
    this.confirmationService.confirm({
          message: '¿Desea eliminar el registro?',
          accept: () => {
              this.concursoService.delete(EndPoindsURL.concursos, concurso.concursoId)
                .subscribe( response => {
                  this.msgs.push(
                      { severity: 'success', summary: 'Borrado!', detail: 'Los datos han sido borrados.'});
                      this.reset(); setTimeout(() => { this.msgs =[]; }, 3000);
                      this.dataSource = this.data = response;
                }, error => {
                    this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
                    setTimeout(() => this.msgs = [], 3000);
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
          this.loadData();
          setTimeout(() => this.msgs = [], 3000);
      } else {
        this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
      }
  }

  private reset() {
    this.dataTable.reset();
    this.dataTable.sortField = 'nombre';
    this.concurso = { concursoId: null, nombre: '', fechaInicio: '', fechaTermino: '', comentarios: ''};
  }
}
