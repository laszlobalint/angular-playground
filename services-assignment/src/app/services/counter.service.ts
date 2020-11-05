import { Injectable } from "@angular/core";

@Injectable()
export class CounterService {
  inactiveCounter = 0;
  activeCounter = 0;

  incrementInactive(): void {
    this.inactiveCounter++;
    console.log(`Inactivated ${this.inactiveCounter} times.`);
  }

  incrementActive(): void {
    this.activeCounter++;
    console.log(`Activated ${this.activeCounter} times.`);
  }
}
