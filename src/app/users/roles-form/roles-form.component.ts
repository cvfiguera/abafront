import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { Rol } from './../../common/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent implements OnInit {
  @Input() title: string;
  @Input() sistema: number;
  @Input() rol: Rol;
  @Output() close: EventEmitter<any> = new EventEmitter();
  endPoindUrl: string;
  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.endPoindUrl = EndPoindsURL.roles;
  }

  save() {
    let param: URLSearchParams = new URLSearchParams();
    param.append('sistema', this.sistema.toString());
    this.requestService.saveOrUpdate(this.endPoindUrl, this.rol, param)
      .subscribe(
          response => this.close.emit(true),
          error => this.close.emit(false)
      );
  }
}
