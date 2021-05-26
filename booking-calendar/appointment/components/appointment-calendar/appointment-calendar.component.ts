import {
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { CalendarModel } from '../../models';
import { AppointmentService } from '../../services/appointment.service';

export interface CalendarDateModel {
  day: number;
  month: number;
  year: number;
  today: boolean;
  otherMonth: boolean;
  selectable: boolean;
}

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppointmentCalendarComponent implements OnDestroy {
  _selectedDay = new Date();

  get selectedDay() {
    return this._selectedDay;
  }

  set selectedDay(val: Date) {
    this._selectedDay = val;
    this.appointmentService.selectDay(val);
  }

  savedAppointmentDates: Date[] = [];
  draftAppointmentDates: Date[] = [];

  @Input()
  invalidDates?: Date[];

  @Input()
  invalidDays?: Date[];

  @Input()
  minDate = new Date();

  @Input()
  maxDate = new Date();

  hu = CalendarModel.hu;

  draftAppointmentsSubscription = this.appointmentService.draftAppointmentDates$.subscribe(dates => {
    this.draftAppointmentDates = dates;
    this.changeDetectorRef.detectChanges();
  });

  savedAppointmentsSubscription = this.appointmentService.savedAppointmentDates$.subscribe(dates => {
    this.savedAppointmentDates = dates;
    this.changeDetectorRef.detectChanges();
  });

  constructor(private changeDetectorRef: ChangeDetectorRef, private appointmentService: AppointmentService) {}

  getDateStyle(calendarDate: CalendarDateModel) {
    const style: any = {};

    if (!this.areEqualCalendarDates(this.selectedDay, calendarDate)) {
      if (this.draftAppointmentDates.find(date => this.areEqualCalendarDates(date, calendarDate))) {
        style['background-color'] = '#2c7d88';
        style['color'] = 'white';
      } else if (this.savedAppointmentDates.find(date => this.areEqualCalendarDates(date, calendarDate))) {
        style['background-color'] = '#ffa800';
      }
    }

    return style;
  }

  private areEqualCalendarDates(date: Date, calendarDate: CalendarDateModel): boolean {
    return (
      date.getFullYear() === calendarDate.year &&
      date.getMonth() === calendarDate.month &&
      date.getDate() === calendarDate.day
    );
  }

  ngOnDestroy() {
    this.draftAppointmentsSubscription.unsubscribe();
    this.savedAppointmentsSubscription.unsubscribe();
  }
}
