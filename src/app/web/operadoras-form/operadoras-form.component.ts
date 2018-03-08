import { OperadoraService } from './../../services/operadora.service';
import { Operadora } from './../../common/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'operadoras-form',
  templateUrl: './operadoras-form.component.html',
  styleUrls: ['./operadoras-form.component.css']
})
export class OperadorasFormComponent implements OnInit {
  @Input() title: string;
  @Input() operadora: Operadora;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private operadoraService: OperadoraService) { }

  ngOnInit() {
  }

  save() {
    this.operadoraService.saveOperadora(this.operadora)
      .subscribe(response => {
        this.close.emit('success');
      }, error => {
        this.close.emit('error');
      });
  }
}
