import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Appointment, AppointmentBooking, CreateAppointmentResponseObject } from '../../appointment/models';

@Injectable()
export class CreatePropertyService {
  constructor(private http: HttpClient) {}

  getAppointments(propertyId: string, city: string) {
    const url = `api/v1/PropertyAppointment?propertyId=${propertyId}&city=${city}`;
    return this.http.get<Appointment[]>(url);
  }

  saveAppointments(payload: AppointmentBooking) {
    const url = 'api/v1/PropertyAppointment/Create';
    return this.http.post<CreateAppointmentResponseObject[]>(url, payload);
  }
}
