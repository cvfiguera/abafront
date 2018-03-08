import { RequestService } from './../../services/request.service';
import { Usuario } from './../../common/interfaces';
import { EndPoindsURL } from './../../common/endpoints.constants';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {
  @Input() title: string;
  @Input() id: number;
  @Input() sistema: number;
  @Input() usuario: Usuario;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private requestService: RequestService) { }

  ngOnInit() { }

  save() {
    let param: URLSearchParams = new URLSearchParams();
    param.append('sistema', this.sistema.toString());
    this.requestService.saveOrUpdate(EndPoindsURL.roles + '/' + this.id + '/usuarios', this.usuario, param)
      .subscribe(
          response => this.close.emit(true),
          error => this.close.emit(false)
      );
  }
}
