import { Component, OnInit } from '@angular/core';

@Component({
  //Element selector
  //selector: 'app-servers',
  //Attribute selector
  //selector: '[app-servers]',
  //Class selector
  selector: '.app-servers',
  //Method 1 of writing template
  //templateUrl: './servers.component.html', //We can either specify a template html externally or define one locally
  //Method 2 of writing template
  //template: `<app-server></app-server>
  //           <app-server></app-server>`,
  //Method 3 of writing template
  template: '<app-server></app-server><app-server></app-server>',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
