import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { filter, map } from 'rxjs/operators'
/**interface créer pour l'exemple du pipe RXJS */
interface User{
  firstName:string,
  lastName:string
}

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

  /**utilisation des pipe avant le subscribe pour modifier la donnée contenue dans l'observable */
  personne: BehaviorSubject<User> = new BehaviorSubject(null)

  ngOnInit() {
    console.log(this.el)
    console.log(this.el.nativeElement.innerHTML)

    /**Apres un appel http par exemple je next le resulta recu*/
    this.personne.next({
      lastName: 'pierre',
      firstName : 'Girou'
    })

    this.personne.pipe(
      filter((personne: User) =>  personne != null ), // ici si le user existe alors il passera a l'étape d'apres si il stop car il fait qu'il renvoi un boolean
      map((personne: User)=> {
        return `${personne.firstName} ${personne.lastName}`
      }) // grace au pipe je modifi la donnée recu avant le subscribe
    ).subscribe(data => console.log(data));
    
  }

}
