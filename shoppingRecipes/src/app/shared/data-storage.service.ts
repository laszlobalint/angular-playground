import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Recipe } from '../components/recipes/recipe.model';
import { RecipeService } from '../components/recipes/recipe.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) {}

  storeData() {
    return this.http.put('https://recipe-book-75f4b.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  fetchData() {
    this.http.get('https://recipe-book-75f4b.firebaseio.com/recipes.json').map(
      (response: Response) => {
          const recipes: Recipe[] = response.json();
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