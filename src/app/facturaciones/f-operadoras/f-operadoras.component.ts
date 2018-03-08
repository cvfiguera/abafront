import { Operadora } from './../../common/interfaces';
import { UtilService } from './../../services/util.service';
import { Message } from 'primeng/primeng';
import { ReportesService } from './../../services/reportes.service';
import { FiltroService } from './../../services/filtro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-f-operadoras',
  templateUrl: './f-operadoras.component.html',
  styleUrls: ['./f-operadoras.component.css'],
  providers: [ ReportesService ]
})
export class FOperadorasComponent implements OnInit {
  titlePage: String = 'Reporte - Facturaciones por Operadoras';
  filtro: any;
  months = [];
  years = [];
  data: any[] = [];
  dataReg: any[] = [];
  cols: any;
  dataG: any;
  msgs: Message[] = [];
  options: any;
  tipo: number;
  constructor(private filtroService: FiltroService,
    private reportesService: ReportesService, private utilService: UtilService) { }

  ngOnInit() {
    this.filtro = { mesIni: null, mesFin: null, anioIni: null, anioFin: null };
    this.months = this.filtroService.getMonths();
    this.years = this.filtroService.getYears();

    this.cols = [
      {field: 'orden', header: 'N°', sortable: 'true' },
      {field: 'nombre', header: 'Región', sortable: 'false' },
    ];

    this.tipo = 1;
  }

  loadDataFiltered() {
    this.cols = [
      {field: 'orden', header: 'N°', sortable: 'true' },
      {field: 'nombre', header: 'Región', sortable: 'false' },
    ];
    this.options = {
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            return tooltipItem.yLabel.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: (value, index, values) => {
              return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
          }
        }]
      }
    };
    this.tipo = 1;

    this.reportesService.getRegiones(this.filtro)
      .subscribe(response => {
        this.data = this.dataReg = response;
        this.graficar();
      }, error => {
        this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
        setTimeout(() => { this.msgs = []; }, 3000);
      });
  }

  verDetalle(regionId, tipo) {
    this.tipo = tipo;
    if (tipo == 2) {
      this.cols = [
        {field: 'region', header: 'Region', sortable: 'true' },
        {field: 'operadora', header: 'Operadora', sortable: 'true' }
      ];
    } else {
      this.cols = [
        {field: 'region', header: 'Región', sortable: 'true' },
        {field: 'mes', header: 'Mes', sortable: 'false' },
        {field: 'anio', header: 'Año', sortable: 'false' }
      ];
    }

    this.reportesService.getRegionesDetalle(this.filtro, regionId, (tipo == 2)?'operadoras':'meses')
    .subscribe(response => {
      if (tipo == 3) {
        this.data = response.map(row => {
          return { regionId: row.regionId, region: row.region, anio: row.anio,
          nMes: row.mes, mes: this.utilService.getNombreMes(row.mes), total: row.total };
        });
        this.graficar();
      } else {
        this.data = response;
        this.graficar();
      }
    }, error => {
      this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
      setTimeout(() => { this.msgs = []; }, 3000);
    });
  }

  regresar(row) {

    if (this.tipo == 4) this.verDetalle(row.regionId, 3);
    else if (this.tipo == 5) this.verDetalle(row.regionId, 2);
    else {
      this.cols = [
        {field: 'orden', header: 'N°', sortable: 'true' },
        {field: 'nombre', header: 'Región', sortable: 'false' },
      ];
      this.tipo = 1;
      this.data = this.dataReg;
    }
    this.graficar();
  }

  private graficar() {
    let labelsArr;

    switch (this.tipo) {
      case 1: labelsArr = this.data.map(reg => reg.nombre);
      break;
      case 2: labelsArr = this.data.map(row => row.operadora);
      break;
      case 3: labelsArr = this.data.map(row => row.mes.substr(0, 3) + '-' + row.anio);
      break;
      case 4: labelsArr = this.data.map(row => row.operadora);
      break;
      case 5: labelsArr = this.data.map(row => row.mes.substr(0, 3) + '-' + row.anio);
    }
    
    this.dataG = {
      labels: labelsArr,
      datasets: [
          {
              label: 'Total Facturado',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: this.data.map(reg => reg.total)
          }
      ]
    };
  }

  verDetalleMes(row) {
    this.tipo = 4;
    this.cols = [
      {field: 'region', header: 'Región', sortable: 'true' },
      {field: 'mes', header: 'Mes', sortable: 'false' },
      {field: 'anio', header: 'Año', sortable: 'false' },
      {field: 'operadora', header: 'Operadora', sortable: 'false' }
    ];

    this.reportesService.getDetalleMeses(row.nMes, row.anio, row.regionId)
    .subscribe(response => {
      this.data = response.map(row => {
        return { regionId: row.regionId, region: row.region, anio: row.anio,
        nMes: row.mes, mes: this.utilService.getNombreMes(row.mes),
        operadoraId: row.operadoraId, operadora: row.operadora, total: row.total };
      });
      this.graficar();
    }, error => {
      this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
      setTimeout(() => { this.msgs = []; }, 3000);
    });
  }

  verDetalleOpe(row) {
    this.tipo = 5;
    this.cols = [
      {field: 'region', header: 'Región', sortable: 'true' },
      {field: 'operadora', header: 'Operadora', sortable: 'false'},
      {field: 'mes', header: 'Mes', sortable: 'false' },
      {field: 'anio', header: 'Año', sortable: 'false' }
    ];

    this.reportesService.getDetalleOperadora(this.filtro, row.regionId, row.operadoraId)
    .subscribe(response => {
      this.data = response.map(row => {
        return { regionId: row.regionId, region: row.region, operadoraId: row.operadoraId,
          operadora: row.operadora, anio: row.anio, nMes: row.mes,
          mes: this.utilService.getNombreMes(row.mes), total: row.total };
      });
      this.graficar();
    }, error => {
      this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
      setTimeout(() => { this.msgs = []; }, 3000);
    });
  }
}
