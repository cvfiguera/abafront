import { Message, ConfirmationService } from 'primeng/primeng';
import { Router } from '@angular/router';
import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tipo-adj',
  templateUrl: './tipo-adj.component.html',
  styleUrls: ['./tipo-adj.component.css']
})
export class TipoAdjComponent implements OnInit {
  titlePage = 'Tipos de Adjudicaciones';
  title: string;
  dataSource: any[] = [];
  data: any[] = [];
  tipo: any = { id: null, nombre: '', descripcion: '' };
  msgs: Message[] = [];
  constructor(private requestService: RequestService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.requestService.getAll(EndPoindsURL.tipoAdjudicaciones)
      .subscribe(
        response => this.dataSource = this.data = response,
        error => this.loadError()
      );
  }

  getListas(tipo) {
    this.router.navigate(['/web/tipos/' + tipo.id + '/listas']);
  }

  newRowData() {
    this.title = 'Nuevo Tipo de Adjudicación';
    this.tipo = { id: null, nombre: '', descripcion: '' };
  }
  
  loadDataFiltered(nombreCtrl) {
     const nombre: string = nombreCtrl.value;
     this.data = this.dataSource.filter(
      tipo => tipo.nombre.toUpperCase().indexOf(nombre.toUpperCase()) != -1);
  }

  editRowData(tipo) {
    this.title = 'Editar Tipo de Adjudicación';
    this.tipo = tipo;
  }

  deleteRowData(tipo) {
    this.confirmationService.confirm ({
      message: '¿Desea eliminar el registro?',
      accept: () => {
          this.requestService.delete(EndPoindsURL.tipoAdjudicaciones, tipo.id)
            .subscribe(
                response => {
                    this.msgs.push({ severity: 'success', summary: 'Borrado!', detail: 'Los datos han sido borrados.'});
                    this.loadData();
                    setTimeout(() => this.msgs = [], 3000);
                }, error => {
                  this.loadError();
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
      this.loadData();
    }
  }

  private loadError() {
    this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          setTimeout(() => { this.msgs = []; }, 3000);
  }

}
