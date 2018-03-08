import { ResumenService } from './../../services/resumen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'estado-sec',
  templateUrl: './estado-sec.component.html',
  styleUrls: ['./estado-sec.component.css'],
  providers: [ResumenService]
})
export class EstadoSecComponent implements OnInit {
  procesos: any[];
  constructor(private resumenService: ResumenService) { }

  ngOnInit() {
    this.resumenService.getProcesos()
    .subscribe(
      response => {
        this.procesos = response;
    }, error => {});
  }

}
