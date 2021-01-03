import { Component, 
         Input, 
         OnInit, 
         ViewEncapsulation,
         OnChanges, 
         SimpleChanges,
         DoCheck,
         AfterContentInit,
         AfterContentChecked,
         AfterViewInit,
         AfterViewChecked,
         OnDestroy,
         ViewChild,
         ElementRef,
         ContentChild} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated //None, Native
})
export class ServerElementComponent implements 
       OnInit,  
       OnChanges,  
       DoCheck,  
       AfterContentInit,
       AfterContentChecked,
       AfterViewInit,
       AfterViewChecked,
       OnDestroy {
  //ngOnChanges() method will be called if any of the @Input params changes in the parent
  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading',{static:true}) header: ElementRef;
  @ContentChild('contentParagraph',{static: true}) paragraph: ElementRef;

  constructor() {
    console.log('constructor called!');
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngOnInit(){
    console.log('ngOnInit called!');
    console.log("View Child Text: " + this.header.nativeElement.textContent);
    console.log("Content Child Text: " + this.paragraph.nativeElement.textContent);
  }

  ngDoCheck(){
    console.log('ngDoCheck called!');
  }

  ngAfterContentInit(){
    console.log('ngAfterContentInit called!');
    console.log("Content Child Text: " + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked(){
    console.log('ngAfterContentChecked called!');
  }

  ngAfterViewInit(){
    console.log('ngAfterViewInit called!');
    console.log("View Child Text: " + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(){
    console.log('ngAfterViewChecked called!');
  }

  ngOnDestroy(){
    console.log('ngOnDestroy called');
  }

}
