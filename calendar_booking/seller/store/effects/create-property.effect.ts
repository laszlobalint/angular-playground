import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';

import { switchMap, map, catchError, withLatestFrom, concatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromCreateAppointments from '../actions/create-property.action';
import * as fromCore from '../../../core/store/actions';
import * as fromSeller from '../reducers';

import { CreatePropertyService } from '../../services/create-property.service';
import { AppMessageSeverity } from '../../../core/models/message.model';
import { Appointment, CreateAppointmentResponseObject } from '../../../appointment/models';

@Injectable()
export class CreatePropertyEffects {
  constructor(
    private actions: Actions,
    private createPropertyService: CreatePropertyService,
    private sellerStore: Store<fromSeller.SellerState>
  ) {}

  @Effect()
  fetch$ = this.actions.ofType(fromCreateAppointments.CreatePropertyActionsType.FetchAppointments).pipe(
    withLatestFrom(
      this.sellerStore.select(fromSeller.selectPropertyId),
      this.sellerStore.select(fromSeller.selectPropertyCity)
    ),
    map(([action, propertyId, city]: [Action, string | undefined, string | undefined]) => [propertyId, city]),
    switchMap(([propertyId, city]: [string, string]) =>
      this.createPropertyService.getAppointments(propertyId, city).pipe(
        map((appointments: Appointment[]) => new fromCreateAppointments.FetchAppointmentsSuccess(appointments)),
        catchError(error => of(new fromCreateAppointments.FetchAppointmentsFailure(error)))
      )
    )
  );

  @Effect()
  fetchFailure$ = this.actions.ofType(fromCreateAppointments.CreatePropertyActionsType.FetchAppointmentsFailure).pipe(
    map(
      (action: fromCreateAppointments.FetchAppointmentsFailure) =>
        new fromCore.ShowMessage({
          severity: AppMessageSeverity.Error,
          title: 'Sikertelen művelet!',
          message: 'Nem sikerült betölteni az aktuális időpontfoglalásokat!',
        })
    )
  );

  @Effect()
  save$ = this.actions.ofType(fromCreateAppointments.CreatePropertyActionsType.SaveAppointments).pipe(
    withLatestFrom(
      this.sellerStore.select(fromSeller.selectPropertyId),
      this.sellerStore.select(fromSeller.selectPropertyCity)
    ),
    switchMap(([action, propertyId, city]: [fromCreateAppointments.SaveAppointments, string, string]) =>
      this.createPropertyService
        .saveAppointments({
          propertyId: propertyId,
          city: city,
          appointments: action.payload.appointmentsToSave,
          appointmentIdsToDelete: action.payload.appointmentsToDelete,
        })
        .pipe(
          concatMap((response: CreateAppointmentResponseObject[]) => [
            new fromCreateAppointments.SaveAppointmentsSuccess(response.map(responseObj => responseObj.appointment)),
            new fromCreateAppointments.DeleteAppointmentsSuccess(action.payload.appointmentsToDelete),
          ]),
          catchError(error => of(new fromCreateAppointments.SaveAppointmentsFailure(error)))
        )
    )
  );

  @Effect()
  saveSuccess$ = this.actions.ofType(fromCreateAppointments.CreatePropertyActionsType.SaveAppointmentsSuccess).pipe(
    map(
      (action: fromCreateAppointments.SaveAppointmentsSuccess) =>
        new fromCore.ShowMessage({
          severity: AppMessageSeverity.Success,
          title: 'Sikeres művelet!',
          message: 'Az ingatlan megtekintésének időpontjai sikeresen mentve!',
        })
    )
  );

  @Effect()
  saveFailure$ = this.actions.ofType(fromCreateAppointments.CreatePropertyActionsType.SaveAppointmentsFailure).pipe(
    map(
      (action: fromCreateAppointments.SaveAppointmentsFailure) =>
        new fromCore.ShowMessage({
          severity: AppMessageSeverity.Error,
          title: 'Sikertelen művelet!',
          message: 'Nem sikerült elmenteni az ingatlan megtekintésének időpontjait!',
        })
    )
  );
}
