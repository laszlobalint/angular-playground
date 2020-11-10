import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
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

  recipeSelected = new EventEmitter<Recipe>();

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
