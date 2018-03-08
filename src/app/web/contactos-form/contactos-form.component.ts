import { Contacto, Rbd } from './../../common/interfaces';
import { ConfirmationService } from 'primeng/primeng';
import { ContactoService } from './../../services/contacto.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'contactos-form',
  templateUrl: './contactos-form.component.html',
  styleUrls: ['./contactos-form.component.css']
})
export class ContactosFormComponent implements OnInit {
  @Input() title: string;
  @Input() id: number;
  @Input() contacto: Contacto;
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor(private contactoService: ContactoService) { }

  ngOnInit() {
  }

  save() {
    this.contactoService.saveContacto(this.id, this.contacto)
      .subscribe(
          response => this.close.emit('success'),
          error => this.close.emit('error')
      );
  }

}
