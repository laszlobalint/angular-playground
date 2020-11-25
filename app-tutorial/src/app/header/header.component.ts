import { Component } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private readonly dataStorageService: DataStorageService) {}

  onFetchRecipes(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onSaveRecipes(): void {
    this.dataStorageService.saveRecipes();
  }
}
