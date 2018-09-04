import * as fromShoppingList from '../components/shopping-list/store_ngrx/shopping-list.reducers';
import * as fromAuth from '../components/auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};