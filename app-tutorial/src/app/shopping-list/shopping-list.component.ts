import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  public ingredients: Ingredient[] = [
    { name: 'Apples', amount: 5 },
    { name: 'Tomatoes', amount: 10 },
  ];

  onIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }
}
