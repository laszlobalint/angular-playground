import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Subject } from 'rxjs/Subject';

import { Appointment } from '../models';

@Injectable()
export class AppointmentService {
  private selectedDaySource = new Subject<Date>();
  private savedAppointmentDatesSource = new Subject<Date[]>();
  private draftAppointmentDatesSource = new Subject<Date[]>();

  public selectedDay$ = this.selectedDaySource.asObservable();
  public savedAppointmentDates$ = this.savedAppointmentDatesSource.asObservable();
  public draftAppointmentDates$ = this.draftAppointmentDatesSource.asObservable();

  private draftAppointmentsByDate = new Map<string, Date[]>();

  constructor(private datePipe: DatePipe) {}

  public selectDay(date: Date) {
    this.selectedDaySource.next(date);
  }

  /*
    Called on new saved appointment list received
  */
  public setSavedAppointmentDates(appointments: Appointment[]) {
    this.savedAppointmentDatesSource.next(
      appointments.map(
        appointment => new Date(this.datePipe.transform(appointment.startUtc, 'yyyy-MM-ddT00:00:00') + 'Z')
      )
    );
    this.draftAppointmentDatesSource.next([]);
  }

  /*
    Called on bulk draft appointment creation
  */
  public addDraftAppointmentDates(dates: Date[]) {
    dates.forEach(date => {
      const dateString = this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00') + 'Z';
      const appointmentDatesForDate = this.draftAppointmentsByDate.get(dateString);

      if (appointmentDatesForDate && appointmentDatesForDate.length > 0) {
        appointmentDatesForDate.push(date);
      } else {
        this.draftAppointmentsByDate.set(dateString, [date]);
        this.onDraftAppointmentDatesChange();
      }
    });
  }

  /*
    Called on draft appointment deletion
  */
  public removeDraftAppointmentDate(date: Date) {
    const dateString = this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00') + 'Z';
    const appointmentsForDate = this.draftAppointmentsByDate.get(dateString);

    if (appointmentsForDate) {
      const appointmentIndex = appointmentsForDate.findIndex(val => {
        return val.getTime() === date.getTime();
      });

      if (appointmentIndex > -1) {
        appointmentsForDate.splice(appointmentIndex, 1);

        if (!appointmentsForDate.length) {
          this.draftAppointmentsByDate.delete(dateString);
        }

        this.onDraftAppointmentDatesChange();
      }
    }
  }

  /*
    Called on undo draft appointment deletion
  */
  public addDraftAppointmentDate(date: Date) {
    const dateString = this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00') + 'Z';
    const appointmentDatesforDate = this.draftAppointmentsByDate.get(dateString);

    if (appointmentDatesforDate) {
      appointmentDatesforDate.push(date);
    } else {
      this.draftAppointmentsByDate.set(dateString, [date]);

      this.onDraftAppointmentDatesChange();
    }
  }

  private onDraftAppointmentDatesChange() {
    const draftDates: Date[] = [];
    this.draftAppointmentsByDate.forEach((val, key) => {
      draftDates.push(new Date(key));
    });

    this.draftAppointmentDatesSource.next(draftDates);
  }
}
