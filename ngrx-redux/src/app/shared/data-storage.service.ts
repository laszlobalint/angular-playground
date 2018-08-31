import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Recipe } from '../components/recipes/recipe.model';
import { RecipeService } from '../components/recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  
  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

  storeData() {
    return this.httpClient.put('https://recipe-book-75f4b.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      observe: 'body',
    });
  }

  fetchData() {
    this.httpClient.get<Recipe[]>('https://recipe-book-75f4b.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json',
    }).map(
      (recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}