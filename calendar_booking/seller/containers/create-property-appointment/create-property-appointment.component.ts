import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromSeller from '../../store';

import { SaveAppointmentsPayload } from '../../../appointment/models';

@Component({
  selector: 'app-create-property-appointment',
  template: `
    <h2 class="ml2 secondary">Időpontok megadása</h2>
    <app-appointment-editor
      [appointments]="appointments$ | async"
      (submitted)="onAppointmentsSubmit($event)">
        <app-appointment-calendar class="w-100" appointment-calendar
          [minDate]="todayDate" [maxDate]="offerEndDate">
        </app-appointment-calendar>
    </app-appointment-editor>
  `,
})
export class CreatePropertyAppointmentComponent implements OnInit {
  appointments$ = this.sellerStore.select(fromSeller.selectPropertyAppointments);

  todayDate = new Date();
  offerEndDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDay());

  constructor(private sellerStore: Store<fromSeller.SellerState>) {}

  ngOnInit() {
    this.sellerStore.dispatch(new fromSeller.FetchAppointments());
  }

  onAppointmentsSubmit(appointments: SaveAppointmentsPayload) {
    this.sellerStore.dispatch(new fromSeller.SaveAppointments(appointments));
  }
}
