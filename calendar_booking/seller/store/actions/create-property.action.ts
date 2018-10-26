import { Action } from '@ngrx/store';

import { Appointment, SaveAppointmentsPayload } from '../../../appointment/models/appointment.model';

export enum CreatePropertyActionsType {
  SaveAppointments = '[Property Appointments] Save Appointments',
  DeleteAppointmentsSuccess = '[Property Appointments] Delete Appointments',
  SaveAppointmentsSuccess = '[Property Appointments] Save Appointments Success',
  SaveAppointmentsFailure = '[Property Appointments] Save Appointments Failure',
  FetchAppointments = '[Property Appointments] Fetch Appointments',
  FetchAppointmentsSuccess = '[Property Appointments] Fetch Appointments Success',
  FetchAppointmentsFailure = '[Property Appointments] Fetch Appointments Failure',
}

export class SaveAppointments implements Action {
  readonly type = CreatePropertyActionsType.SaveAppointments;

  constructor(public payload: SaveAppointmentsPayload) {}
}

export class SaveAppointmentsSuccess implements Action {
  readonly type = CreatePropertyActionsType.SaveAppointmentsSuccess;

  constructor(public payload: Appointment[]) {}
}

export class DeleteAppointmentsSuccess implements Action {
  readonly type = CreatePropertyActionsType.DeleteAppointmentsSuccess;

  constructor(public payload: string[]) {}
}

export class SaveAppointmentsFailure implements Action {
  readonly type = CreatePropertyActionsType.SaveAppointmentsFailure;

  constructor(public payload: string) {}
}

export class FetchAppointments implements Action {
  readonly type = CreatePropertyActionsType.FetchAppointments;
}

export class FetchAppointmentsSuccess implements Action {
  readonly type = CreatePropertyActionsType.FetchAppointmentsSuccess;

  constructor(public payload: Appointment[]) {}
}

export class FetchAppointmentsFailure implements Action {
  readonly type = CreatePropertyActionsType.FetchAppointmentsFailure;

  constructor(public payload: string) {}
}

export type CreatePropertyActions =
  | SaveAppointments
  | DeleteAppointmentsSuccess
  | SaveAppointmentsSuccess
  | SaveAppointmentsFailure
  | FetchAppointments
  | FetchAppointmentsSuccess
  | FetchAppointmentsFailure;
