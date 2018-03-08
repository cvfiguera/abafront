import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { Concurso } from './../../common/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'concursos-form',
  templateUrl: './concursos-form.component.html',
  styleUrls: ['./concursos-form.component.css']
})
export class ConcursosFormComponent implements OnInit {
  @Input() title: string;
  @Input() concurso: Concurso;
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor(private concursoService: RequestService) { }

  ngOnInit() {
   
  }

  save() {
    this.concursoService.saveOrUpdate(EndPoindsURL.concursos, this.concurso)
      .subscribe(response => {
        this.close.emit('success');
      }, error => {
        this.close.emit('error');
      });
  }
}
