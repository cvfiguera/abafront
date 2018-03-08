import { Message } from 'primeng/primeng';
import { FeriadoService } from './../../services/feriado.service';
import { Feriado } from './../../common/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'feriados',
  templateUrl: './feriados.component.html',
  styleUrls: ['./feriados.component.css']
})
export class FeriadosComponent implements OnInit {
  titlePage = 'Feriados';
  title: string;
  events: any[];
  header: any;
  event;
  msgs: Message[] = [];
  dialogVisible: boolean = false;
  feriado: Feriado;
  constructor(private feriadoService: FeriadoService) { }

  ngOnInit() {
    this.feriado = { id: null, start: '', title: '' };
    this.header = {
        left: 'prev,next today',
        center: 'title',
		    right: 'month,agendaWeek,agendaDay'
     };
     this.loadData();
  }

  loadData() {
    this.feriadoService.getFeriados()
        .subscribe(
            response => {
                this.events = response;
            }, error => {
                this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
                setTimeout(() => { this.msgs = []; }, 3000);
            });
  }

  handleDayClick(event, button) {
    this.feriado.start = event.date.format();
    button.click();
  }
  
  handleEventClick(e, button) {
    this.feriado.id = e.calEvent.id;
    this.feriado.start = e.calEvent.start.format();
    this.feriado.title = e.calEvent.title;
    button.click();
  }

  onClose(success: boolean) {
    if (success) {
      this.msgs.push(
        {
          severity: 'success',
          summary: 'Éxito!',
          detail: 'La operación ha sido realizada.'
        });
        this.feriado = { id: null, start: '', title: ''};
        this.loadData();
        setTimeout(() => { this.msgs = []; }, 3000);
    } else {
      this.msgs.push( { severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' } );
    }
}
}
