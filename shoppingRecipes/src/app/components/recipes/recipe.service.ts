import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.module";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Pancake', 
      'Mix the sour well with water', 
      './src/app/shared/images/pancake.jpeg',
      [
        new Ingredient('Sour', 5),
        new Ingredient('Jam', 1)
      ]
    ),
    new Recipe(
      'Burek', 
      'Put fat, oil and soil a lot on it.', 
      './src/app/shared/images/burek.jpg',
      [
        new Ingredient('Meat', 3),
        new Ingredient('Mushrooms', 2)
      ]  
    )
  ];

  constructor(private shoppingService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  addIngredientsToList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }
}