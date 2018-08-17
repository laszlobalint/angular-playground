import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscritpion: Subscription;

  constructor() { }

  ngOnInit() {
    const numbers = Observable.interval(1000)
    .map(
      (data: number) => {
        return data * 2;
      }
    );
    this.numbersObsSubscription = numbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const customObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('First package');
      }, 2000);
      setTimeout(() => {
        observer.next('Second package');
      }, 4000);
      setTimeout(() => {
        // observer.error('Sending package does not work!');
        observer.complete();
      }, 5000);
    });
    this.customObsSubscritpion = customObservable.subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log('Completed!'); }
    );
  }

  ngOnDestroy() {
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscritpion.unsubscribe();
  }

}
