import { Message } from 'primeng/primeng';
import { ArchivoFiltro, OperadoraFiltro, Archivo } from './../../common/interfaces';
import { ArchivoService } from './../../services/archivos.service';
import { FiltroService } from './../../services/filtro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  titlePage: String = "Bitácora";
  selectionMode: string;
  filtro: ArchivoFiltro = { operadora: null, mes: null, year: null};
  operadoras: any[] = [];
  months = [];
  years = [];
  msgs: Message[] = [];
  data: Archivo[] = [];
  total: number = 0;
  processData;
  bloqueadoC;
  bloqueadoV;
  constructor(private filtroService: FiltroService, private archivoService: ArchivoService) { }

  ngOnInit() {
    this.filtroService.getOperadoras()
    .subscribe(
      response => {
        this.operadoras = response;
    }, error => {});
  this.months = this.filtroService.getMonths();
  this.years = this.filtroService.getYears();
  this.bloqueadoV = false;
  this.bloqueadoC = true;
  this.selectionMode = 'single';
  }

  getFiles() {
    this.archivoService.getBitacoras(this.filtro)
      .subscribe(
          response => this.data = response,
          error => {}
      );
  }

  procesar(tipo: number) {
    if (this.processData == null) {
      this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Debe seleccionar un archivo.' } );
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    } else {
      this.selectionMode = null;
      this.bloqueadoC = this.bloqueadoV = true;
      if (tipo == 1) this.validar();
      else this.cargar();
    }
  }

  private cargar() {
    let bitacora = {
      nombre: this.processData.archivo,
      version: this.processData.version,
      operadora: this.operadoras.find(operadora => operadora.nombre == this.filtro.operadora).id,
      mes: this.filtro.mes,
      year: this.filtro.year
    };
    this.archivoService.cargarBitacoras(bitacora)
    .subscribe(
      response => {
        this.selectionMode = 'single';
        this.bloqueadoC = this.bloqueadoV = false;
        if (response) {
          this.msgs.push( { severity: 'Finalizado!', summary: 'Info!', detail: 'Proceso Finalizado' } );
        } else {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'No se ha cargado la Bitácora.' } );
        }
        setTimeout(() => { this.msgs = []; }, 2000);
      }, error => {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          setTimeout(() => { this.msgs = []; }, 2000);
          this.bloqueadoC = this.bloqueadoV = false;
      }
    );
    this.msgs.push( { severity: 'success', summary: 'Info!', detail: 'Se ha iniciado la carga de los archivos.' } );
    setTimeout(() => {
      this.msgs = [];
    }, 2000);
  }

  private validar() {
    let bitacora = {
      operadora: this.operadoras.find(operadora => operadora.nombre == this.filtro.operadora).id,
      year: this.filtro.year,
      month: this.filtro.mes,
      archivos: [ { archivo: this.processData.archivo, validar: true } ]
    };
    this.archivoService.validarArchivos(bitacora)
    .subscribe(
      response => {
          setTimeout(() => { this.actualizar() }, 1000);
      }, error => {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          setTimeout(() => { this.msgs = []; }, 3000);
      }
    );
  }

  private actualizar() {
    this.archivoService.getEstatus()
      .subscribe(
        response => {
           if (!response.estado) {
             setTimeout(() => { this.actualizar(); }, 1000);
           } else {
              this.msgs.push( { severity: "Finalizado!", summary: 'Info!', detail: "Proceso Finalizado" } );
              setTimeout(() => { this.msgs = []; }, 3000);
              this.bloqueadoC = false;
              this.bloqueadoV = true;
              this.processData = this.data[0];
              this.selectionMode = 'multiple';
           }
        }, error => {
          this.bloqueadoC = this.bloqueadoV = false;
           this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
           setTimeout(() => { this.msgs = []; }, 3000);
        }
      );
  }
}
