import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy{
  
  secondes: number;
  counterSubscription: Subscription;
  
  constructor() {}

  ngOnInit() {
    const counter = Observable.interval(1000);
    
    //Not choice, infinite counter
    // counter.subscribe(
    //   (value: number) => {
    //     this.secondes = value;
    //   },
    //   (error: any) => {
    //     console.log('Une erreur a été rencontrée !')
    //   },
    //   () => {
    //     console.log('Observable complétée !')
    //   }
    // );

    //Choose to destroy subscription
    this.counterSubscription = counter.subscribe(
      (value: number) => {
        this.secondes = value;
      }
    );
  }

  //Destroy subscription at the end of component life
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
}
