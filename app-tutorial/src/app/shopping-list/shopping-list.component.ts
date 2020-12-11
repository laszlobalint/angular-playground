import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  animations: [
    trigger('list', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        }),
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(500),
      ]),
      transition('* => void', [
        animate(
          500,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients?: Ingredient[];
  public ingredientsChangedSubscription?: Subscription;

  constructor(@Inject(PLATFORM_ID) private readonly platformId, private readonly shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ingredients = this.shoppingListService.getIngredients();
      this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => (this.ingredients = ingredients),
      );
    }
  }

  ngOnDestroy(): void {
    if (this.ingredientsChangedSubscription) {
      this.ingredientsChangedSubscription.unsubscribe();
    }
  }

  onIngredientAdded(ingredient: Ingredient): void {
    this.shoppingListService.addIngredient(ingredient);
  }

  onEditItem(id: number): void {
    this.shoppingListService.startedEditing.next(id);
  }
}
