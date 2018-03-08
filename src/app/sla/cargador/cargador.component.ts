import { FiltroService } from './../../services/filtro.service';
import { ArchivoFiltro, OperadoraFiltro, Archivo } from './../../common/interfaces';
import { ArchivoService } from './../../services/archivos.service';
import { NgForm } from '@angular/forms';
import { DataTable, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'cargador',
  templateUrl: './cargador.component.html',
  styleUrls: ['./cargador.component.css']
})
export class CargadorComponent implements OnInit {
  titlePage: String = "Cargador de Arhivos SLA";
  selectionMode: string;
  filtro: ArchivoFiltro = { operadora: null, mes: null, year: null};
  operadoras: OperadoraFiltro[] = [];
  months = [];
  years = [];
  msgs: Message[] = [];
  data: Archivo[] = [];
  total: number = 0;
  processData: Archivo[] = [];
  bloqueado: boolean = false;

  constructor(private filtroService: FiltroService, private archivoService: ArchivoService) { }

  ngOnInit() {
   this.filtroService.getOperadoras()
      .subscribe(
        response => {
          this.operadoras = response;
      }, error => {});
    this.months = this.filtroService.getMonths();
    this.years = this.filtroService.getYears();
    this.archivoService.getProcesoActivo()
      .subscribe(
          response => {
            this.bloqueado = response.procesoId == null ? false : true;
            this.filtro.mes = response.mes;
            this.filtro.year = response.anio;
            this.filtro.operadora = response.operadora;
            this.data = response.archivos;
            if (this.bloqueado) {
              this.selectionMode = null;
              this.total = this.data.length;
              this.actualizar();
            } else this.selectionMode = 'multiple';
          }, error => {}
      );
 }

  getFiles() {
    this.archivoService.getValidados(this.filtro)
      .subscribe(
          response => this.data = response,
          error => {}
      );
  }

  cargar() {
    this.selectionMode = null;
    this.bloqueado = true;
    this.total = this.processData.length;
    this.archivoService.cargarArchivos(this.processData.filter(archivo => archivo.valor != 100).map(file => file.nombre))
    .subscribe(
      response => {}, error => {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          setTimeout(() => { this.msgs = []; }, 3000);
      }
    );
    this.msgs.push( { severity: 'success', summary: 'Info!', detail: 'Se ha iniciado la carga de los archivos.' } );
    setTimeout(() => {
      this.msgs = [];
      this.actualizar();
    }, 4000);
  }

  private actualizar() {
    this.archivoService.getEstatusCarga()
      .subscribe(
        response => {
          this.processData = response;
          let enCurso = this.processData.filter(archivo => archivo.valor < 100);
          if (enCurso.length > 0 || this.processData.length < this.total) {
            setTimeout(() => { this.actualizar(); }, 3000);
          } else {
            this.selectionMode = 'multiple';
            this.bloqueado = false;
            this.msgs.push( { severity: "Finalizado!", summary: 'Info!', detail: "Proceso Finalizado" } );
            setTimeout(() => { this.msgs = []; }, 3000);
          }
        }, error => {}
      );
  }
}