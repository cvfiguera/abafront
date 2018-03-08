import { OperadoraService } from './../../services/operadora.service';
import { EndPoindsURL } from './../../common/endpoints.constants';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataTable, Column, LazyLoadEvent, FilterMetadata, Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import { Operadora, Options, OperadoraFiltro } from './../../common/interfaces';

@Component({
  selector: 'operadoras',
  templateUrl: './operadoras.component.html',
  styleUrls: ['./operadoras.component.css']
})
export class OperadorasComponent implements OnInit {
    titlePage: String = 'Operadoras';
    titleAction: String;
    filtro: OperadoraFiltro = { rut: '', nombre: '' };
    @ViewChild(DataTable) dataTable: DataTable;
    msgs: Message[] = [];
    rows= 10;
    data: Operadora[];
    options: any;
    totalRecords: number;
    operadora: Operadora = {
        operadoraId: null,
        rut: null,
        nombre: null,
        alias: null,
        observacion: null
    };

    constructor(private operadoraService: OperadoraService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
    }

    private loadData () {
        this.operadoraService.getOperadoras(this.options, this.filtro)
        .subscribe(
            response => {
              this.data = response.content;
              this.totalRecords = response.totalElements;
            }, error => {
               this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            }
      );
    }

    loadDataFiltered() {
        this.options = {
        first: 0,
        rows: 10,
        sortField: 'operadoraId',
        sortOrder: 'asc'
      };
      this.loadData();
    }

    loadDataLazy(event: LazyLoadEvent) {
      this.options = {
        first: event.first,
        rows: event.rows,
        sortField: event.sortField === null ? 'operadoraId' : event.sortField,
        sortOrder: event.sortOrder === 1 ? 'asc' : 'desc'
      };
      this.loadData();
    }

    newRowData() {
      this.operadora = {
        operadoraId: null,
        rut: null,
        nombre: null,
        alias: null,
        observacion: null
      };
      this.titleAction = 'Nueva operadora';
    }

    editRowData(operadora: Operadora) {
      this.titleAction = 'Editar operadora';
      this.operadora = operadora;
    }

    deleteRowData(operadora: Operadora) {
      this.confirmationService.confirm({
            message: '¿Desea eliminar el registro?',
            accept: () => {
               this.operadoraService.deleteOperadora(operadora)
                  .subscribe( response => {
                    this.msgs.push(
                        {
                          severity: 'success',
                          summary: 'Borrado!',
                          detail: 'Los datos han sido borrados.'
                        });
                        this.data = response.content;
                        this.totalRecords = response.totalElements;
                        this.dataTable.reset();
                        setTimeout(() => { this.msgs =[]; }, 3000);
                  }, error => {
                      this.data = error.content;
                      this.totalRecords = error.totalElements;
                      this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
                      setTimeout(() => { this.msgs =[]; }, 3000);
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
            this.dataTable.reset();
            setTimeout(() => { this.msgs = []; }, 3000);
        } else {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
        }
    }
}
