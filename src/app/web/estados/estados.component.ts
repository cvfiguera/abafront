import { TipoEstado } from './../../common/estados.constants';
import { EstadoService } from './../../services/estado.service';
import { Estado, SubEstado } from './../../common/interfaces';
import { DataTable, Message, ConfirmationService } from 'primeng/primeng';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {
    titleAction: string;
    titlePage: string = 'Estados de RBDs';
    tipo: number;
    @ViewChild(DataTable) dataTable: DataTable;
    msgs: Message[] = [];
    rows= 10;
    data: Estado[];
    dataSource: Estado[];
    cols: any[] = [];
    show: boolean;
    estado: SubEstado = { estadoId: null, padre: { estadoId: null, descripcion: '' }, descripcion: '' };
  constructor(private estadoService: EstadoService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.show = true;
    this.tipo = 4;
    this.loadData();
  }

  newEstado(tipo: number) {
    this.tipo = tipo;
    if (tipo == TipoEstado.subadjudicacion) {
       this.show = true;
       this.dataTable.sortField = 'padre.descripcion';
    } else {
        this.show = false;
        this.dataTable.sortField = 'descripcion';
    }
    this.loadData();
  }

  private loadData () {
      this.estadoService.getEstados(this.tipo)
      .subscribe(
          response => {
            this.data = this.dataSource = response;
          }, error => {
              this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          }
    );
  }

    loadDataFiltered(nombre) {
      const text: string = nombre.value;
      this.data = this.dataSource.filter(estado => estado.descripcion.toLocaleUpperCase().indexOf(text.toLocaleUpperCase()) != -1);
    }

    newRowData() {
      this.titleAction = 'Nuevo Estado';
      this.estado = { estadoId: null, padre: { estadoId: null, descripcion: '' }, descripcion: '' };
    }

    editRowData(estado) {
      this.titleAction = 'Editar Estado';
      this.estado = estado;
    }

    deleteRowData(estado: Estado) {
      this.confirmationService.confirm({
            message: '¿Desea eliminar el registro?',
            accept: () => {
               this.estadoService.deleteEstado(estado, this.tipo)
                  .subscribe( response => {
                    this.msgs.push(
                        {
                          severity: 'success',
                          summary: 'Borrado!',
                          detail: 'Los datos han sido borrados.'
                        });
                        this.reset();
                        this.dataSource = this.data = response;
                        setTimeout(() => { this.msgs =[]; }, 3000);
                  }, error => {
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
            this.reset();
            this.loadData();
            setTimeout(() => { this.msgs = []; }, 3000);
        } else {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
        }
    }

    private reset() {
      this.dataTable.reset();
      this.estado = { estadoId: null, padre: { estadoId: null, descripcion: '' }, descripcion: '' };
    }

}
