import { Message } from 'primeng/primeng';
import { EndPoindsURL } from './../../common/endpoints.constants';
import { RequestService } from './../../services/request.service';
import { Usuario } from './../../common/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  titlePage = "Perfil de Usuario";
  cambiar = false;
  usuario = { rut: null, username: '', nombre: '', apellido: '',
              organizacion: '', pass: '', repass: '', newpass: '',
              telefono: '', email: '', rol: ''};
  endPoindUrl;
  msgs: Message[] = [];
  bloqueado: boolean;
  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.bloqueado = false;
    this.endPoindUrl = EndPoindsURL.perfil;
    this.requestService.getAll(this.endPoindUrl)
      .subscribe(
        response => {
          this.usuario = response;
          this.usuario.repass = this.usuario.pass;
        }, error => {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          setTimeout(() => { this.msgs = []; }, 3000);
        }
    );
  }

  cambiarPass() {
    this.usuario.pass = this.usuario.newpass = this.usuario.repass = '';
  }

  actualizar() {
    this.bloqueado = true;
    this.requestService.saveOrUpdate(this.endPoindUrl, this.usuario)
      .subscribe(
        response => {
          this.msgs.push({
            severity: 'success',
            summary: 'Guardado!',
            detail: 'Los datos han sido guardados.'
          });
          setTimeout(() => this.msgs = [], 3000);
          this.bloqueado = false;
        }, error => {
          this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
          setTimeout(() => this.msgs = [], 3000);
          this.bloqueado = false;
        }
      );

  }
}
