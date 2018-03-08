import { ResumenService } from './../../services/resumen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calendario-sec',
  templateUrl: './calendario-sec.component.html',
  styleUrls: ['./calendario-sec.component.css'],
  providers: [ResumenService]
})
export class CalendarioSecComponent implements OnInit {
  feriados: any[];

  constructor(private resumenService: ResumenService) { }

  ngOnInit() {
    this.resumenService.getFeriados()
    .subscribe(
      response => {
        this.feriados = response;
    }, error => {});
  }

}
