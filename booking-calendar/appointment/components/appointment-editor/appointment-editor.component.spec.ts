import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AppointmentEditorComponent } from './appointment-editor.component';
import { AppointmentCalendarComponent } from '../appointment-calendar/appointment-calendar.component';
import { AppointmentListPipe } from '../../pipes/appointment-list.pipe';
import { AppointmentService } from '../../services/appointment.service';

describe('AppointmentEditorComponent', () => {
  let component: AppointmentEditorComponent;
  let fixture: ComponentFixture<AppointmentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe, AppointmentService],
      declarations: [AppointmentEditorComponent, AppointmentCalendarComponent, AppointmentListPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
