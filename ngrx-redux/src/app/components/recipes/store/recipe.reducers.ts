import { Recipe } from "../recipe.model";
import { Ingredient } from "../../../shared/ingredient.module";
import * as RecipeActions from '../store/recipes.actions';
import { AppState } from "../../../store/app.reducers";

export interface FeatureState extends AppState {
  recipes: State
}

export interface State {
  recipes: Recipe[];
}

const initialState = {
  recipes: [
    new Recipe(
      'Burek', 
      'Preparing the dough: Mix 1 pound (453.5g) of flour and 1 tablespoon of salt in a bowl. Add approximately 16 ounces (473ml) of water to the bowl. Mix until you have a dough of a soft and malleable consistency. Spread a tablecloth across the table. Add a pinch of flour on the area where you will knead the dough. Knead the dough on the tablecloth. Let the dough sit for 15 minutes. Preparing the filling: Dice the veal and onion. Add the diced veal and onion to a bowl. Add the following ingredients to the bowl of veal and onion. Mix the contents of the bowl. Shaping the dough: Flatten the dough using a rolling pin. Spread vegetable or olive oil on the surface of the flattened dough. Using your hands, stretch the dough carefully. Preparing Burek: Add the diced veal and onion in a row on the flattened dough. Flip the edges of the dough up over the veal and onion. Roll the dough around the diced veal and onion until you have 3-5 layers of dough around each row. Cut away any remaining dough. Make a rough spiral out of each row. Place in a pan. Place the pan in the oven and cook at 430 °F (221 °C), for 40-50 minutes.', 
      './src/app/shared/images/burek.jpg',
      [
        new Ingredient('Veal', 1),
        new Ingredient('Salt', 2),
        new Ingredient('Pepper', 1),
        new Ingredient('Vegeta', 1),
        new Ingredient('Yellow onion', 1),
        new Ingredient('Olive oil', 2),
        new Ingredient('Flour', 1),
        new Ingredient('Water', 1)
      ]
    ),
    new Recipe(
      'Pancake', 
      'Crack the eggs into a bowl and beat until creamy. Add in the dry ingredients (including baking soda if using self-rising flour). Do not stir mixture at this point! Melt the butter in a microwave-safe bowl. Make sure that its completely melted; about a minute is sufficient. Add the butter and milk to the mix. Stir gently, leaving some small clumps of dry ingredients in the batter. Do not blend until completely smooth. If your batter is smooth, your pancakes will be tough and flat as opposed to fluffy. Heat the frying pan to a medium low flame. If you have an initial pancake setting on your stove, use that. Be sure to use non-stick spray, or a pat of butter so the pancakes wont stick. Sprinkle a few flecks of water onto your pan. If it dances, or jumps from the pan with a sizzle, the pan is ready for the batter. Pour about 3 tablespoons to 1/4 cup batter from the tip of a large spoon or from a pitcher onto the hot griddle or greased frying pan. The amount you pour will decide the final size of your pancakes. It is best to begin with less batter, and then slowly pour more batter onto the pan to increase the pancake size. Cook for about two minutes or until the pancake is golden. You should see bubbles form and then pop around the edges. When the bubbles at the edge of the batter pop and a hole is left that does not immediately close up, flip the cake gently. Cook the other side until golden and remove. Want a deeper color? Repeat the steps for another thirty seconds per side until the pancake is done enough for your tastes. Try adding butter, peanut butter, syrup, jelly, chocolate chips, cookies, candy crumbles or fruit to your pancakes for a different, more exciting flavor. The varieties are endless. These are the most delectable pancakes you will ever taste.', 
      './src/app/shared/images/pancake.jpeg',
      [
        new Ingredient('Self-rising flour', 2),
        new Ingredient('Eggs', 3),
        new Ingredient('Milk', 2),
        new Ingredient('Baking soda', 1),
        new Ingredient('Butter', 2),
        new Ingredient('Sugar', 5),
        new Ingredient('Vanilla extract', 1),
        new Ingredient('Sour', 1)
      ])
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case (RecipeActions.UPDATE_RECIPE):
    const recipe = state.recipes[action.payload.index];
    const updatedRecipe = {
      ...recipe,
      ...action.payload.updatedRecipe
    };
    const recipes = [...state.recipes];
    recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}