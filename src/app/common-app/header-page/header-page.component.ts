import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent implements OnInit {

  @Input()
  title: String;

  constructor() { }

  ngOnInit() {
  }

}
