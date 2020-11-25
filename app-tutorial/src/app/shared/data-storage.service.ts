import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private URL = 'https://recipe-ad7f9.firebaseio.com/recipes.json';

  constructor(private readonly http: HttpClient, private readonly recipeService: RecipeService) {}

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.URL).pipe(
      map((recipes) =>
        recipes.map((recipe) => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        }),
      ),
      tap((recipes) => this.recipeService.setRecipes(recipes)),
    );
  }

  saveRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>(this.URL, recipes).subscribe((response) => response);
  }
}
