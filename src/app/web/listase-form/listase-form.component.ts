import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'listase-form',
  templateUrl: './listase-form.component.html',
  styleUrls: ['./listase-form.component.css']
})
export class ListaseFormComponent implements OnInit {
  @Input() title;
  @Input() lista;
  @Input() operadoras: any[];
  @Input() tecnologias: any[];
  @Input() id: number;
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor(private requestService: RequestService) { }

  ngOnInit() {}

  save() {
    this.requestService.saveOrUpdate(EndPoindsURL.tipoAdjudicaciones + '/' + this.id + EndPoindsURL.listasEspera, this.lista)
      .subscribe(response => {
        this.close.emit('success');
      }, error => {
        this.close.emit('error');
      });
  }
}
