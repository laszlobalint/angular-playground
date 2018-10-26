import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { roundDate } from '../../utils/date-manipulation.util';

import { Appointment, AppointmentFormModel, NewAppointment, SaveAppointmentsPayload } from '../../models';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-editor',
  templateUrl: './appointment-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentEditorComponent implements OnDestroy {
  appointmentFormModelsByStartUtc = new Map<string, AppointmentFormModel>();

  @Input()
  set appointments(value: Appointment[]) {
    this.appointmentService.setSavedAppointmentDates(value);
    this.appointmentFormModelsByStartUtc.clear();
    value.forEach(appointment => {
      this.appointmentFormModelsByStartUtc.set(appointment.startUtc, {
        id: appointment.id,
        startUtc: appointment.startUtc,
        value: appointment,
        isDeleted: false,
      });
    });

    this.checkIfDirty();
  }

  _selectedDay = new Date();

  get selectedDay() {
    return this._selectedDay;
  }

  set selectedDay(date: Date) {
    this._selectedDay = date;

    this.selectedStartTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 6, 30, 0, 0);
    this.selectedEndTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 0, 0, 0);

    this.changeDetectorRef.detectChanges();
  }

  selectedDaySubscription = this.appointmentService.selectedDay$.subscribe(day => {
    this.selectedDay = day;
  });

  selectedStartTime = roundDate(new Date());
  selectedEndTime = new Date(this.selectedStartTime.getTime() + 30 * 60000);

  isDirty = false;

  @Output()
  submitted = new EventEmitter<SaveAppointmentsPayload>();

  stepMinute = 30;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe,
    private appointmentService: AppointmentService
  ) {}

  getAppointmentFormModels(): AppointmentFormModel[] {
    return Array.from(this.appointmentFormModelsByStartUtc.values());
  }

  private checkIfDirty() {
    this.isDirty = this.getAppointmentFormModels().some(appointmentFormModel => {
      if (appointmentFormModel.newValue || appointmentFormModel.isDeleted) {
        return true;
      }
      return false;
    });
  }

  onSelectTimeInterval() {
    let time = this.selectedStartTime;
    const dates: Date[] = [];
    while (this.selectedEndTime > time) {
      const timeString = this.datePipe.transform(time, 'yyyy-MM-ddTHH:mm:00') + 'Z';
      if (!this.appointmentFormModelsByStartUtc.get(timeString)) {
        dates.push(time);
        this.appointmentFormModelsByStartUtc.set(timeString, {
          newValue: { lengthInMinutes: 30, startUtc: timeString },
          startUtc: timeString,
          isDeleted: false,
        });
      }

      time = new Date(time.getTime() + 30 * 60000);
    }

    this.checkIfDirty();
    this.appointmentService.addDraftAppointmentDates(dates);
  }

  onDeleteAppointment(appointment: AppointmentFormModel) {
    this.appointmentFormModelsByStartUtc.set(appointment.startUtc, {
      ...appointment,
      isDeleted: true,
    });

    const date = new Date(appointment.startUtc);
    date.setHours(date.getHours() + new Date().getTimezoneOffset() / 60);

    if (appointment.value) {
      this.appointmentService.addDraftAppointmentDate(date);
    } else if (appointment.newValue) {
      this.appointmentService.removeDraftAppointmentDate(date);
    }

    this.checkIfDirty();
  }

  onUndoDeleteAppointment(appointment: AppointmentFormModel) {
    this.appointmentFormModelsByStartUtc.set(appointment.startUtc, {
      ...appointment,
      isDeleted: false,
    });

    const date = new Date(appointment.startUtc);
    date.setHours(date.getHours() + new Date().getTimezoneOffset() / 60);

    if (appointment.value) {
      this.appointmentService.removeDraftAppointmentDate(date);
    } else if (appointment.newValue) {
      this.appointmentService.addDraftAppointmentDate(date);
    }

    this.checkIfDirty();
  }

  onSubmit() {
    const appointmentsToSave = this.getAppointmentFormModels()
      .filter(appointment => appointment.newValue && !appointment.isDeleted)
      .map(appointment => appointment.newValue as NewAppointment);

    const appointmentsToDelete = this.getAppointmentFormModels()
      .filter(appointment => appointment.value && appointment.isDeleted)
      .map(appointment => (appointment.value as Appointment).id);

    this.submitted.emit({ appointmentsToSave, appointmentsToDelete });
  }

  ngOnDestroy() {
    this.selectedDaySubscription.unsubscribe();
  }
}
