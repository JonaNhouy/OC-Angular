import { Component, OnInit } from '@angular/core';
import { AppareilService } from './services/appareil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
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

  // appareilOne = 'Machine à laver';
  // appareilTwo = 'Télévision';
  // appareilThree = 'Ordinateur';
  
  constructor(private appareilService: AppareilService) {
    setTimeout(() => {
      this.isAuth = true;
    }, 4000
    );
    
  }

ngOnInit(){
  //create services
  this.appareils = this.appareilService.appareils;
}

  onAllumer(){
    this.appareilService.switchOnAll();
  }
  onEteindre(){
    this.appareilService.switchOffAll();
  }
}
