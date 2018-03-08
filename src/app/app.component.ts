import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'aba-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class App {
  constructor(public router: Router) {}
}
