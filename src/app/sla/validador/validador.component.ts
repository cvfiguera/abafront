import { Message, DataTable } from 'primeng/primeng';
import { ArchivoFiltro, Operadora, Sftp, Validador } from './../../common/interfaces';
import { ArchivoService } from './../../services/archivos.service';
import { FiltroService } from './../../services/filtro.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css']
})
export class ValidadorComponent implements OnInit {
  titlePage = "Validador de Archivos SLA";
  filtro: ArchivoFiltro = { operadora: null, mes: null, year: null};
  @ViewChild(DataTable) dataTable: DataTable;
  operadoras: any[] = [];
  months = [];
  years = [];
  msgs: Message[] = [];
  data: any[];
  processData: any[] = [];
  bloqueado: boolean = false;
  selectionMode: string;
  constructor(private filtroService: FiltroService, private archivoService: ArchivoService) { }

  ngOnInit() {
    this.selectionMode = 'multiple';
    this.filtroService.getOperadoras()
      .subscribe(
        response => {
          this.operadoras = response;
      }, error => {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          setTimeout(() => { this.msgs = []; }, 3000);
     });
    this.months = this.filtroService.getMonths();
    this.years = this.filtroService.getYears();
  }

  getFiles() {
    this.data = this.processData = [];
    this.archivoService.getNoValidados(this.filtro)
      .subscribe(
          response => {
            this.data = response;
          }, error => {
              this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
              setTimeout(() => { this.msgs = []; }, 4000);
          }
      );
  }

  selectAll() {
    for (let i = 0; i < this.processData.length; i++) {
        const archivo: Validador = {
        operadora: this.operadoras.find(operadora => operadora.nombre == this.filtro.operadora).id,
        year: this.filtro.year,
        month: this.filtro.mes,
        archivos: [
          {
            archivo: this.processData[i].archivo,
            validar: true
          }
        ]
      };
      this.archivoService.esValido(archivo)
      .subscribe(
          response => {
            this.processData[i].estado = response?"Procesado":"No Procesado";
            this.processData[i].termino = response?1:0;
            this.processData[i].procesado = response;
            this.processData[i].validar = false;
          }, error => {
              this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
              setTimeout(() => { this.msgs = []; }, 4000);
          }
      );
    }
  }

  onRowSelect(event) {
      const archivo: Validador = {
        operadora: this.operadoras.find(operadora => operadora.nombre == this.filtro.operadora).id,
        year: this.filtro.year,
        month: this.filtro.mes,
        archivos: [
          {
            archivo: event.data.archivo,
            validar: true
          }
        ]
      };
      this.archivoService.esValido(archivo)
      .subscribe(
          response => {
            event.data.estado = response?"Procesado":"No Procesado";
            event.data.termino = response?1:0;
            event.data.procesado = response;
            event.data.validar = false;
          }, error => {
              this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
              setTimeout(() => { this.msgs = []; }, 4000);
          }
      );
  }

  validar() {
    this.bloqueado = true;
    this.selectionMode = null;
    const validador = {
      operadora: this.operadoras.find(operadora => operadora.nombre == this.filtro.operadora).id,
      year: this.filtro.year,
      month: this.filtro.mes,
      archivos: this.processData.map((archivo) => {
        return {
          archivo: archivo.archivo,
          validar: archivo.validar
        };
      })
    };
    this.llamarProceso(validador);
    this.msgs.push( { severity: 'success', summary: 'Info!', detail: 'Se ha iniciado la carga de los archivos.' } );
    setTimeout(() => {
      this.msgs = [];
      this.actualizar();
    }, 4000);
  }

  actualizar() {
    this.archivoService.getEstatus()
      .subscribe(
        response => {
           this.processData = response.archivos;
           if (!response.estado) {
             setTimeout(() => { this.actualizar(); }, 3000);
           } else {
              this.msgs.push( { severity: "Finalizado!", summary: 'Info!', detail: "Proceso Finalizado" } );
              setTimeout(() => { this.msgs = []; }, 3000);
              this.bloqueado = false;
              this.selectionMode = 'multiple';
           }
        }, error => {
           this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
           setTimeout(() => { this.msgs = []; }, 3000);
        }
      );
  }

  private llamarProceso(validador) {
    this.archivoService.validarArchivos(validador)
      .subscribe(
        response => {
            setTimeout(() => { this.actualizar(); }, 3000);
        }, error => {
            this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
        }
      );
  }
}
