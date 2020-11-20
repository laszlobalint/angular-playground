import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  public recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    {
      name: 'Bolognese Pasta',
      description:
        'Bolognese sauce known in Italian as ragù alla bolognese, pronounced, ragù bolognese, or simply ragù) is a meat-based sauce in Italian cuisine, typical of the city of Bologna. ',
      imagePath: 'https://thecozyapron.com/wp-content/uploads/2019/05/spaghetti-bolognese_thecozyapron_1.jpg',
      ingredients: [
        { name: 'Meat', amount: 2 },
        { name: 'Tomatoe', amount: 5 },
      ],
    },
    {
      name: 'Big Burger',
      description:
        'A hamburger (also burger for short) is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
      imagePath: 'https://kep.cdn.indexvas.hu/1/0/3032/30329/303292/30329287_f0a7269532d4fe0e03f1e2dea847be7c_wm.jpg',
      ingredients: [
        { name: 'Meat', amount: 1 },
        { name: 'Onion', amount: 2 },
      ],
    },
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe): void {
    this.recipes.push(newRecipe);
    this.recipes[id] = newRecipe;
  }

  deleteRecipe(id: number): void {
    this.recipes.slice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
