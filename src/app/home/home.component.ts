import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers : [ AuthService ]
})
export class HomeComponent implements OnInit {
  title: String = "SLA: Cargador de archivos";
  constructor() { }

  ngOnInit() {

  }

}