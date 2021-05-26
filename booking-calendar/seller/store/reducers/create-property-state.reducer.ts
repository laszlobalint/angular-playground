import * as fromCreateProperty from '../actions/create-property.action';
import { Appointment } from '../../../appointment/models';

export interface CreatePropertyState {
  propertyId?: string;
  city?: string;
  propertyAppointments: Appointment[];
}

export const initialState: CreatePropertyState = {
  propertyId: '862fe3e0-539e-46aa-9ce5-06605fa15526',
  city: 'Budapest',
  propertyAppointments: [],
};

export function reducer(state = initialState, action: fromCreateProperty.CreatePropertyActions): CreatePropertyState {
  switch (action.type) {
    case fromCreateProperty.CreatePropertyActionsType.SaveAppointmentsSuccess:
      return {
        ...state,
        propertyAppointments: state.propertyAppointments.concat(action.payload),
      };

    case fromCreateProperty.CreatePropertyActionsType.DeleteAppointmentsSuccess:
      return {
        ...state,
        propertyAppointments: state.propertyAppointments.filter(appointment => !action.payload.includes(appointment.id)),
      };

    case fromCreateProperty.CreatePropertyActionsType.FetchAppointmentsSuccess:
      return {
        ...state,
        propertyAppointments: action.payload,
      };

    default:
      return state;
  }
}

export const getPropertyAppointments = (state: CreatePropertyState) => state.propertyAppointments;
