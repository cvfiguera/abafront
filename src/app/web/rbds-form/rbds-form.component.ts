import { Message } from 'primeng/primeng';
import { FiltroService } from './../../services/filtro.service';
import { RbdService } from './../../services/rbd.service';
import { Rbd, RegionSet } from './../../common/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rbds-form',
  templateUrl: './rbds-form.component.html',
  styleUrls: ['./rbds-form.component.css']
})
export class RbdsFormComponent implements OnInit {
  @Input() title: string;
  @Input() rbd: Rbd;
  @Input() regiones: RegionSet[];
  @Input() region: RegionSet = { regionId: null, numero: null, nombre: null, comunas: null };
  @Output() close: EventEmitter<any> = new EventEmitter();
  msgs: Message[] = [];
  
  constructor(private rbdService: RbdService, private filtroService: FiltroService) { }

  ngOnInit() {
  }

  save() {
    this.rbdService.saveRbd(this.rbd)
      .subscribe(response => {
        this.close.emit('success');
      }, error => {
        this.close.emit('error');
      });
  }

  changeMod(selected) {
    if (selected.value === null) {
      this.region = { regionId: null, numero: null, nombre: null, comunas: null };
    } else {
      this.region = this.regiones.find( act => act.regionId == selected.value);
    }
  }
}
