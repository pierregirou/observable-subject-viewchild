import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  title = 'appObservable';
  subscriptionData: Subscription
  ngOnInit():void{
    const monObservable = new Observable((observer: Observer<any>)=>{
      var data = 3
      observer.next(data)
      /*on peut envoyer plusieur données*/
      observer.next(4)
      observer.next(5)
      observer.next(6)
      /* avec du text asynchrone maintenat */
      setTimeout(()=>{
        data = 7
        observer.next(data)
        observer.complete() // il met fin a l'observable les prochain next ne seront pas executé
        observer.error('Attention observable terminé avec complete méthode') // il met fin a l'observable les prochain next ne seront pas executé
        observer.next(data+1)
      },3000)

    })

    // facon 1
  /*  const observer = {
      next: (data)=>{console.log('[next]', data)},
      complete: ()=>{console.log('[complete]', 'Observable completed')},
      error: (e)=>{console.log('[error]', e)}
    }
    monObservable.subscribe(observer)
*/
    //facon 2
    /*monObservable.subscribe({
      next: (data)=>{console.log('[next]', data)},
      complete: ()=>{console.log('[complete]', 'Observable completed')},
      error: (e)=>{console.log('[error]', e)}
    })*/


        //facon 3 avec un callback c'est la méthode la plus utiliser
        /**
         * les callbabks sont definit dans l'ordre du plus important au moins soit :
         * next en 1
         * error en 2
         * complete en 3
         */
       this.subscriptionData =  monObservable.subscribe(
          (data)=>{
            console.log('[next]', data)
        }, (error)=>{
          console.log('[error]', error)
        }, ()=>{
          console.log('[complete]', 'Observable completed')
        })

  }
  ngOnDestroy(){
    this.subscriptionData.unsubscribe()
  }
}
