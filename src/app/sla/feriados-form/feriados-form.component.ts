import { FeriadoService } from './../../services/feriado.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'feriados-form',
  templateUrl: './feriados-form.component.html',
  styleUrls: ['./feriados-form.component.css']
})
export class FeriadosFormComponent implements OnInit {
  @Input() title: string;
  @Input() feriado;
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor(private feriadoService: FeriadoService) { }

  ngOnInit() {
  }

  save() {
    this.feriadoService.saveFeriado(this.feriado)
      .subscribe(
          response => this.close.emit('success'),
          error => this.close.emit('error'));
  }

  delete() {
    this.feriadoService.deleteFeriado(this.feriado)
    .subscribe(
      response => this.close.emit('success'),
      error => this.close.emit('error'));
  }
}
