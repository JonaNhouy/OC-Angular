import { Subject } from "rxjs/Subject";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AppareilService {
    
  //Emet appareil list to acces ext
  appareilSubject = new Subject<any[]>();
  
  // appareils = [
  private appareils = [];

    constructor(private httpClient: HttpClient) {

    }

    emitAppareilSubject() {
      this.appareilSubject.next(this.appareils.slice());
    }

    getAppareilById(id: number) {
      const appareil = this.appareils.find(
        (appareilObject) => {
          return appareilObject.id === id;
        }
      );
      return appareil;
    }

    // this.emitAppareilSubject(); => see changement

    switchOnAll() {
      for (let appareil of this.appareils) {
        appareil.status = 'allumé';              
      }
      this.emitAppareilSubject();
    }
    
    switchOffAll() {
      for (let appareil of this.appareils) {
        appareil.status = 'éteint';              
      }
      this.emitAppareilSubject();
    }
    
    switchOnOne(i: number) {
      this.appareils[i].status = 'allumé';
      this.emitAppareilSubject();
    }
    
    switchOffOne(i: number) {
      this.appareils[i].status = 'éteint';
      this.emitAppareilSubject();
    }

    addAppareil(name: string, status:string) {
      const appareilObject = {
        id: 0,
        name: '',
        status: ''
      };
      appareilObject.name = name;
      appareilObject.status = status;
      appareilObject.id = this.appareils[(this.appareils.length - 1)].id +1;
      this.appareils.push(appareilObject);
      this.emitAppareilSubject();
    }

    saveAppareilsToServer(){
      this.httpClient
        .put('https://http-client-demo-db6d9-default-rtdb.firebaseio.com/appareils.json', this.appareils)
        .subscribe(
          () => {
            console.log('Enregistrement terminé !');
          },
          (error) => {
            console.log('Erreur de sauvegarde ! ' + error);
          }
        )
    }

    getAppareilsFromServer() {
      this.httpClient
        .get<any[]>('https://http-client-demo-db6d9-default-rtdb.firebaseio.com/appareils.json')
        .subscribe(
          (response) => {
            this.appareils = response;
            this.emitAppareilSubject();
          },
          (error) => {
            console.log('Erreur de chargement ! ' + error);
          }
        );
    }
}