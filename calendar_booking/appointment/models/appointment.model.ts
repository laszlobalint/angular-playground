export interface Appointment {
  id: string;
  startUtc: string;
  endUtc: string;
  booked: Boolean;
  booking: Booking;
}

export interface Booking {
  bookedBy: BookedBy;
  bookedUtc: string;
}

export interface BookedBy {
  id: string;
  fullName: string;
}

export interface AppointmentFormModel {
  id?: string;
  startUtc: string;
  value?: Appointment;
  newValue?: NewAppointment;
  isDeleted?: boolean;
}

export interface NewAppointment {
  startUtc: string;
  lengthInMinutes: number;
}

export interface AppointmentBooking {
  propertyId: string;
  city: string;
  appointments: NewAppointment[];
  appointmentIdsToDelete?: string[];
}

export interface CreateAppointmentResponseObject {
  createContext: CreateContext;
  errorCode: string;
  appointment: Appointment;
  isSuccess: boolean;
  errorMessage: string;
}

export interface CreateContext {
  startUtc: string;
  lengthInMinutes: number;
}

export interface SaveAppointmentsPayload {
  appointmentsToSave: NewAppointment[];
  appointmentsToDelete: string[];
}
