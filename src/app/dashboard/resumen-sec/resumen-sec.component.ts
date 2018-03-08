import { ResumenService } from './../../services/resumen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'resumen-sec',
  templateUrl: './resumen-sec.component.html',
  styleUrls: ['./resumen-sec.component.css'],
  providers: [ResumenService]
})
export class ResumenSecComponent implements OnInit {
  data: any[] = [];
  periodo;
  constructor(private resumenService: ResumenService) { }

  ngOnInit() {
    this.periodo = this.resumenService.getPeriodo();
    this.resumenService.getResumenOperadoras()
    .subscribe(
      response => {
        this.data = response;
    }, error => {});
  }

}
