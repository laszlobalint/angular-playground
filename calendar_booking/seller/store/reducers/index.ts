import { Action, ActionReducer, ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromCreateProperty from './create-property-state.reducer';
import * as fromRoot from '../../../store';
import * as fromAuth from '../../../auth/store/actions';

export interface SellerState {
  createProperty: fromCreateProperty.CreatePropertyState;
}

export const reducers: ActionReducerMap<SellerState> = {
  createProperty: fromCreateProperty.reducer,
};

export interface State extends fromRoot.State {
  seller: SellerState;
}

export function resetStateReducer(reducer: ActionReducer<SellerState>) {
  return function resetReducer(state: SellerState | undefined, action: Action) {
    return reducer(action.type === fromAuth.AuthActionTypes.LogoutSuccess ? undefined : state, action);
  };
}

export const selectSellerState = createFeatureSelector<SellerState>('seller');

// Selectors for CreatePropertyState

export const selectCreatePropertyState = createSelector(
  selectSellerState,
  (state: SellerState) => state.createProperty
);
export const selectPropertyId = createSelector(
  selectSellerState,
  (state: SellerState) => state.createProperty.propertyId
);
export const selectPropertyCity = createSelector(selectSellerState, (state: SellerState) => state.createProperty.city);
export const selectPropertyAppointments = createSelector(
  selectCreatePropertyState,
  fromCreateProperty.getPropertyAppointments
);
