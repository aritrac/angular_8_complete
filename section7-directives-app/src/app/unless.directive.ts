import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  //This is an externally bound property in which this method will be fired whenever this parameter changes in the host element
  @Input() set appUnless(condition: boolean){ //selector name and property name should be exactly the same
    if(!condition){
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { 

  }

}
