import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AppointmentFormModel } from '../models';

@Pipe({
  name: 'appointmentListPipe',
})
export class AppointmentListPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(appointments: AppointmentFormModel[], day: Date): AppointmentFormModel[] {
    const date = this.datePipe.transform(day, 'yyyy-MM-dd');
    return appointments
      .filter(sameDay => sameDay.startUtc.startsWith(`${date}`))
      .sort((a: AppointmentFormModel, b: AppointmentFormModel) => {
        return new Date(a.startUtc).getTime() - new Date(b.startUtc).getTime();
      });
  }
}
