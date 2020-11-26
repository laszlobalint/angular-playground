import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubscription?: Subscription;

  constructor(private readonly dataStorageService: DataStorageService, private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => (this.isAuthenticated = !!user));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onFetchRecipes(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onSaveRecipes(): void {
    this.dataStorageService.saveRecipes();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
