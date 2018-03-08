import { URLSearchParams } from '@angular/http';
import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { ArchivoService } from './../../services/archivos.service';
import { FiltroService } from './../../services/filtro.service';
import { Message } from 'primeng/primeng';
import { ArchivoFiltro } from './../../common/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facturador',
  templateUrl: './facturador.component.html',
  styleUrls: ['./facturador.component.css']
})
export class FacturadorComponent implements OnInit {
  titlePage = "Facturación de Archivos SLA";
  filtro = { concurso: null, operadora: null, mes: null, year: null};
  operadoras: any[] = [];
  concursos: any[] = [];
  months = [];
  years = [];
  msgs: Message[] = [];
  data: any[];
  bloqueado: boolean = false;
  constructor(private filtroService: FiltroService, private requestService: RequestService) { }

  ngOnInit() {
    this.filtroService.getOperadoras()
      .subscribe(
        response => {
          this.operadoras = response;
      }, error => {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          setTimeout(() => { this.msgs = []; }, 3000);
     });
     this.filtroService.getConcursos()
     .subscribe(
       response => {
         this.concursos = response;
     }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
         setTimeout(() => { this.msgs = []; }, 3000);
    });
    this.months = this.filtroService.getMonths();
    this.years = this.filtroService.getYears();
  }

  getFiles() {
    let params: URLSearchParams = new URLSearchParams();
    params.append('concurso', this.filtro.concurso);
    params.append('operadora', this.filtro.operadora);
    params.append('mes', this.filtro.mes);
    params.append('anio', this.filtro.year);

    this.requestService.getAll(EndPoindsURL.archivosCalculos, params)
    .subscribe(
        response => {
          this.data = response;
          if (this.data.length == 0) {
            this.msgs.push( { severity: 'warn', summary: 'Advertencia!',
                              detail: 'No existen archivos procesados para el periodo.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
          }
        }, error => {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          setTimeout(() => { this.msgs = []; }, 3000);
        }
    );
  }

  calcular() {
    let params: URLSearchParams = new URLSearchParams();
    params.append('concurso', this.filtro.concurso);
    params.append('operadora', this.filtro.operadora);
    params.append('mes', this.filtro.mes);
    params.append('anio', this.filtro.year);

    this.requestService.saveOrUpdate(EndPoindsURL.archivosCalculos, params)
    .subscribe(
        response => {
          this.data = response;
        }, error => {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          setTimeout(() => { this.msgs = []; }, 3000);
        }
    );
  }

  facturar() {

  }

}
