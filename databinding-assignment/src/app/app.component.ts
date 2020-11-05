import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  incrementNums: number[] = [];

  public onIntervalFired(number: number): void {
    this.incrementNums.push(number);
  }
}
