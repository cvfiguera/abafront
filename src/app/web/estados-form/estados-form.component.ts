import { TipoEstado } from './../../common/estados.constants';
import { EstadoService } from './../../services/estado.service';
import { Message } from 'primeng/primeng';
import { Estado, SubEstado } from './../../common/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'estados-form',
  templateUrl: './estados-form.component.html',
  styleUrls: ['./estados-form.component.css']
})
export class EstadosFormComponent implements OnInit {
  @Input() title: string;
  @Input() tipo: number;
  @Input() isSubEstado: boolean;
  @Input() estado: SubEstado;
  estadosPadre: Estado[];
  @Output() close: EventEmitter<any> = new EventEmitter();
  msgs: Message[] = [];
  constructor(private estadoService: EstadoService) { }

  ngOnInit() {
    this.estadoService.getEstados(TipoEstado.adjudicacion)
      .subscribe(response => {
        this.estadosPadre = response;
      }, error => {
        this.close.emit('error');
      });
  }

   save() {
     let est: SubEstado;
     if (this.isSubEstado) {
        est = { 
          estadoId: this.estado.estadoId, 
          padre: { estadoId: this.estado.padre.estadoId, descripcion: this.estado.padre.descripcion }, 
            descripcion: this.estado.descripcion };
     }else {
        est = { 
          estadoId: this.estado.estadoId, 
          padre: { estadoId: null, descripcion: '' }, 
          descripcion: this.estado.descripcion };
    }
    this.estadoService.saveEstado(this.estado, this.tipo)
      .subscribe(response => {
        this.close.emit('success');
      }, error => {
        this.close.emit('error');
      });
  }
}
