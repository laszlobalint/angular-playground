import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { AppointmentCalendarComponent } from './appointment-calendar.component';
import { AppointmentService } from '../../services/appointment.service';

describe('AppointmentCalendarComponent', () => {
  let component: AppointmentCalendarComponent;
  let fixture: ComponentFixture<AppointmentCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CalendarModule, BrowserAnimationsModule, FormsModule],
      declarations: [AppointmentCalendarComponent],
      providers: [DatePipe, AppointmentService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
