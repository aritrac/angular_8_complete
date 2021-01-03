import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  //newServerName = ''; This is not being used as we are using local reference to fetch the server name value into typescript code
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) { //This is being passed the local reference of the input element that we defined in the template
    this.serverCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent});
  }

  onAddBlueprint(nameInput: HTMLInputElement) { //This is being passed the local reference of the input element that we defined in the template
    this.blueprintCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent});
  }
}
