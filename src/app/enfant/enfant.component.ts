import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-enfant',
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.css']
})
export class EnfantComponent implements OnInit {

  /**
   * idem qu'un getElementById 
   * via une référence (#maref) nous recuperons l'element du dom contenant la rèf
   * DESCRIPTION: @ViewChild('NomDeElementRef',{static:true}) el: Type(ElementRef<HTMLParagraphElement>)
   */
  @ViewChild('secondParagraphe',{static:true}) el: ElementRef<HTMLParagraphElement>
  constructor() { }

  ngOnInit() {
    console.log(this.el)
    console.log(this.el.nativeElement.innerHTML)
  }

}
