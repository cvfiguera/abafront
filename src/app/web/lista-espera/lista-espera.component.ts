import { EndPoindsURL } from './../../common/endpoints.constants';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from './../../services/request.service';
import { Message, ConfirmationService } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.component.html',
  styleUrls: ['./lista-espera.component.css']
})
export class ListaEsperaComponent implements OnInit {
  operadoras: any[];
  tecnologias: any[];
  titlePage: string;
  title: string;
  data: any[];
  dataSource: any[];
  lista: any;
  filtro;
  id: number;
  msgs: Message[] = [];
  constructor(private requestService: RequestService, private route: ActivatedRoute,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.titlePage = 'Listas de Espera';
    this.filtro = { operadora: null, rbd: null};
    this.route.params.subscribe(params => {
    this.id = + params['id'];
    });
    this.lista = { listaEsperaId: null, velocidadSubida: 0, velocidadBajada: 0, precio: 0,
      tipoAdjudicacion: this.id, operadoraId: null, operadora: '', tecnologiaId: null, tecnologia: '',
      rbdId: null, rbd: '', concursoId: null, concurso: ''};
    this.loadData();
    this.requestService.getAll(EndPoindsURL.filtrosOperadoras)
      .subscribe(
        response => this.operadoras = response,
        error => {
            this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
          }
      );
    this.requestService.getAll(EndPoindsURL.filtrosTecnologias)
      .subscribe(
        response => this.tecnologias = response,
        error => {
            this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
          }
      );
  }

  private loadData() {
    this.requestService.getAll(EndPoindsURL.tipoAdjudicaciones + '/' + this.id + EndPoindsURL.listasEspera)
      .subscribe(
          response => {
            this.dataSource = this.data = response;
          }, error => {
            this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
          }
      );
  }

  loadDataFiltered(operadoraCtrl, rbdCtrl) {
    const operadora = operadoraCtrl.value;
    const rbd = rbdCtrl.value;
    this.data = this.dataSource.filter(
      lista => ((lista.operadoraId == operadora) &&
                 (lista.rbdId == rbd)));
  }

  newRowData() {
    this.title = 'Nueva Lista de Espera';
    this.lista = { listaEsperaId: null, velocidadSubida: 0, velocidadBajada: 0, precio: 0,
      tipoAdjudicacion: this.id, operadoraId: null, operadora: '', tecnologiaId: null, tecnologia: '',
      rbdId: null, rbd: '', concursoId: null, concurso: ''};
  }

  editRowData(listae) {
    this.title = 'Editar Lista de Espera';
    this.lista = listae;
  }

  deleteRowData(listae) {
    this.confirmationService.confirm ({
      message: '¿Desea eliminar el registro?',
      accept: () => {
          this.requestService.delete(EndPoindsURL.tipoAdjudicaciones + '/' + this.id + EndPoindsURL.listasEspera, listae)
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
