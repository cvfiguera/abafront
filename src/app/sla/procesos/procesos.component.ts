import { UtilService } from './../../services/util.service';
import { ProcesosService } from './../../services/procesos.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit {
  titlePage: string;
  title: string;
  msgs: Message[] = [];
  data: any[] = [];
  dataDetail: any[] = [];

  constructor(private router: Router, private procesoService: ProcesosService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.titlePage = 'Procesos SLA';
  }

  loadData(fechaIni, fechaFin) {
    if(fechaIni.value!='' && fechaFin.value!='') {
      this.procesoService.getProcesos(fechaIni.value, fechaFin.value)
      .subscribe(
          response => {
            this.data = response;
          }, error => {
            this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
          }
      );
    } else {
       this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Debe especificar un rango de fechas.' } );
       setTimeout(() => { this.msgs = []; }, 3000);
    }
    
  }

  getDetalle(proceso) {
    this.procesoService.getDetalleProceso(proceso.id)
      .subscribe(
          response => {
            this.dataDetail = response;
          }, error => {
            this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
            setTimeout(() => { this.msgs = []; }, 3000);
          }
      );
  }

  getMes(mes: number) {
    return this.utilService.getNombreMes(mes);
 }

}
