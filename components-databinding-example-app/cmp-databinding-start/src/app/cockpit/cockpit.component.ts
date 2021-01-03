import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  //newServerName = ''; This is not being used as we are using local reference to fetch the server name value into typescript code
  //newServerContent = ''; This is not being used as we are using @ViewChild to fetch the server content value into typescript code
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  //Here serverName is being passes as method argument of a local reference which actually points to the element
  onAddServer(nameInput: HTMLInputElement) { //This is being passed the local reference of the input element that we defined in the template
    //Here serverContent is being accessed via ViewChild decorator which provides an elementRef which provides access to the underlying nativeElement to get its value
    this.serverCreated.emit({serverName: nameInput.value, serverContent: this.serverContentInput.nativeElement.value});
  }

  onAddBlueprint(nameInput: HTMLInputElement) { //This is being passed the local reference of the input element that we defined in the template
    this.blueprintCreated.emit({serverName: nameInput.value, serverContent: this.serverContentInput.nativeElement.value});
  }
}
