import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

  isAuth = false;

  //Pipes Date
  lastUpdate = new Promise(
    (resolve, reject) => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
        }, 2000
      );
    }
  )

  appareils: any[];
  appareilSubscription: Subscription
  
  constructor(private appareilService: AppareilService) {
    setTimeout(() => {
      this.isAuth = true;
    }, 4000
    );
    
  }

  ngOnInit(){
    //create services
    // this.appareils = this.appareilService.appareils;
    
    //abstration supp better control data modifier
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer(){
    this.appareilService.switchOnAll();
  }
  onEteindre(){
    if (confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    }
    return null;
  }

}
