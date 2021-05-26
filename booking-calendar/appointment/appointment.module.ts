import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AppointmentEditorComponent } from './components/appointment-editor/appointment-editor.component';
import { AppointmentCalendarComponent } from './components/appointment-calendar/appointment-calendar.component';

import { AppointmentListPipe } from './pipes/appointment-list.pipe';
import { AppointmentService } from './services/appointment.service';

@NgModule({
  imports: [SharedModule],
  declarations: [AppointmentEditorComponent, AppointmentListPipe, AppointmentCalendarComponent],
  exports: [AppointmentEditorComponent, AppointmentCalendarComponent],
  providers: [AppointmentService],
})
export class AppointmentModule {}
