import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //We can use external style files or also define localized styling for each component
  //Method 1
  //styleUrls: ['./app.component.css']
  //Method 2
  styles: [`
  h3{
    color: violet
  }
  `]
})
export class AppComponent {
  
}
