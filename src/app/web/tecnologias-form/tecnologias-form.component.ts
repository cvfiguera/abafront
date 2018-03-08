import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { Tecnologia } from './../../common/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tecnologias-form',
  templateUrl: './tecnologias-form.component.html',
  styleUrls: ['./tecnologias-form.component.css']
})
export class TecnologiasFormComponent implements OnInit {

  @Input() title: string;
  @Input() tecnologia: Tecnologia;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private tecnologiaService: RequestService) { }

  ngOnInit() {
  }

  save() {
    this.tecnologiaService.saveOrUpdate(EndPoindsURL.tecnologias, this.tecnologia)
      .subscribe(response => {
        this.close.emit('success');
      }, error => {
        this.close.emit('error');
      });
  }
}
