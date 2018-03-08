import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { Tecnologia } from './../../common/interfaces';
import { DataTable, Message, ConfirmationService } from 'primeng/primeng';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.css']
})
export class TecnologiasComponent implements OnInit {
  titlePage: string = 'Operadoras';
  titleAction: string;
  @ViewChild(DataTable) dataTable: DataTable;
  msgs: Message[] = [];
  rows= 10;
  data: Tecnologia[];
  dataSource: Tecnologia[];
  tecnologia: Tecnologia = { tecnologiaId: null, nombre: '', observacion: ''};

  constructor(private tecnologiaService: RequestService, private confirmationService: ConfirmationService) { }

  ngOnInit() { 
    this.loadData();
  }

  private loadData () {
      this.tecnologiaService.getAll(EndPoindsURL.tecnologias)
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
      this.data = this.dataSource.filter(tecnologia => tecnologia.nombre.toLocaleUpperCase().indexOf(text.toLocaleUpperCase()) != -1);
    }

    newRowData() {
      this.titleAction = 'Nueva Tecnología';
      this.tecnologia = { tecnologiaId: null, nombre: '', observacion: ''};
    }

    editRowData(tecnologia: Tecnologia) {
      this.titleAction = 'Editar Tecnología';
      this.tecnologia = tecnologia;
    }

    deleteRowData(tecnologia: Tecnologia) {
      this.confirmationService.confirm({
            message: '¿Desea eliminar el registro?',
            accept: () => {
               this.tecnologiaService.delete(EndPoindsURL.tecnologias, tecnologia.tecnologiaId)
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
      this.dataTable.sortField = 'nombre';
      this.tecnologia = { tecnologiaId: null, nombre: '', observacion: ''};
    }
}
