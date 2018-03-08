import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tipo-adj-form',
  templateUrl: './tipo-adj-form.component.html',
  styleUrls: ['./tipo-adj-form.component.css']
})
export class TipoAdjFormComponent implements OnInit {

  @Input() title: string;
  @Input() tipoAdj: any;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private requestService: RequestService) { }

  ngOnInit() {
  }

  save() {
    this.requestService.saveOrUpdate(EndPoindsURL.tipoAdjudicaciones, this.tipoAdj)
      .subscribe(response => {
        this.close.emit('success');
      }, error => {
        this.close.emit('error');
      });
  }
}
