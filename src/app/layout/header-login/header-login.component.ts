import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css']
})
export class HeaderLoginComponent implements OnInit {
   image;

  constructor() { }

  ngOnInit() {
    this.image = {
      alt: 'Logo ABA',
      url: 'assets/aba_logo.jpg'
    };
  }

}