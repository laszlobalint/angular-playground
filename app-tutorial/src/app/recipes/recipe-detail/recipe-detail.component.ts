import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent {
  @Input() recipe?: Recipe;

  constructor(private readonly shoppingListService: ShoppingListService) {}

  onToShoppingList(): void {
    this.recipe.ingredients.forEach((ingredient) => this.shoppingListService.addIngredient(ingredient));
  }
}
