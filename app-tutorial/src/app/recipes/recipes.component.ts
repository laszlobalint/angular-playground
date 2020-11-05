import { Component, Input } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  @Input() selectedRecipe?: Recipe;

  onSelected(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}
