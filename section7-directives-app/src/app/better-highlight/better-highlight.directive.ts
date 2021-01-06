import { Directive, 
  ElementRef, 
  HostBinding, 
  HostListener, 
  Input, 
  OnInit, 
  Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  //we are binding the style.background color property of the host element on which this directive sets to backgroundColor typescrit variable so that we dont have to type
  //this.elementRef.nativeElement.style.backgroundColor everytime
  @HostBinding('style.backgroundColor') backgroundColor: string;
  constructor(private elementRef: ElementRef,private renderer : Renderer2) { }

  ngOnInit(){
    this.backgroundColor = this.defaultColor; //setting default value to defaultColor property of the custom directive
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }

  //We are listening to the mouseenter event on the host element of our directive
  @HostListener('mouseenter') mouseOver(eventData: Event){
    //either the commented line or the line below that can be used to achieve the same purpose
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  //We are listening to the mouseleave event on the host element of our directive
  @HostListener('mouseleave') mouseLeave(eventData: Event){
    //either the commented line or the line below that can be used to achieve the same purpose
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }

}
