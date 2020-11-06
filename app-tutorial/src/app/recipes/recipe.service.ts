import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    {
      name: 'Test',
      description: 'Test recipe',
      imagePath:
        'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FSeries%2F2020-07-medi-monday-one-pot-eggplant-caponata-pasta%2FKitchn_MediMonday_Eggplant_1',
    },
    {
      name: 'Fresh',
      description: 'Fresh recipe',
      imagePath:
        'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FSeries%2F2020-07-medi-monday-one-pot-eggplant-caponata-pasta%2FKitchn_MediMonday_Eggplant_1',
    },
  ];

  recipeSelected = new EventEmitter<Recipe>();

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
