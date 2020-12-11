import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId,
    private readonly dataStorageService: DataStorageService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userSubscription = this.authService.user.subscribe((user) => (this.isAuthenticated = !!user));
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
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
