import { CounterService } from "./counter.service";
import { Injectable } from "@angular/core";

@Injectable()
export class UsersService {
  activeUsers = ["Max", "Anna"];
  inactiveUsers = ["Chris", "Manu"];

  constructor(private counterService: CounterService) {}

  onSetToInactive(id: number): void {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.counterService.incrementInactive();
  }

  onSetToActive(id: number): void {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counterService.incrementActive();
  }
}
