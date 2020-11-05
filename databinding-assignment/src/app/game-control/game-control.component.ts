import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent {
  @Output() intervalFired = new EventEmitter<number>();
  ref?: number;
  number = 0;

  public onStartGame(): void {
    this.ref = setInterval(() => {
      ++this.number;
      this.intervalFired.emit(this.number);
    }, 1000);
  }

  public onStopGame(): void {
    clearInterval(this.ref);
  }
}
