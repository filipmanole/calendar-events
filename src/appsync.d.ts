export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: string; output: string; }
  AWSDateTime: { input: string; output: string; }
  AWSEmail: { input: string; output: string; }
  AWSIPAddress: { input: string; output: string; }
  AWSJSON: { input: string; output: string; }
  AWSPhone: { input: string; output: string; }
  AWSTime: { input: string; output: string; }
  AWSTimestamp: { input: number; output: number; }
  AWSURL: { input: string; output: string; }
};

export type Appointment = {
  __typename?: 'Appointment';
  appointmentId: Scalars['ID']['output'];
  calendarId: Scalars['ID']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  endAt: Scalars['AWSDateTime']['output'];
  startAt: Scalars['AWSDateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type Calendar = {
  __typename?: 'Calendar';
  calendarId: Scalars['ID']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type CreateAppointmentInput = {
  calendarId: Scalars['ID']['input'];
  durationInMinutes: Scalars['Int']['input'];
  overlap: Scalars['Boolean']['input'];
  startAt: Scalars['AWSDateTime']['input'];
  title: Scalars['String']['input'];
};

export type CreateCalendarInput = {
  name: Scalars['String']['input'];
};

export type DeleteAppointmentInput = {
  appointmentId: Scalars['ID']['input'];
};

export type DeleteCalendarInput = {
  calendarId: Scalars['ID']['input'];
};

export enum ListAppointmentType {
  Day = 'DAY',
  Week = 'WEEK'
}

export type ListAppointmentsInput = {
  calendarId: Scalars['ID']['input'];
  date: Scalars['AWSDate']['input'];
  type: ListAppointmentType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAppointment: Appointment;
  createCalendar: Calendar;
  deleteAppointment: Scalars['Boolean']['output'];
  deleteCalendar: Scalars['Boolean']['output'];
  updateAppointment: Appointment;
  updateCalendar: Calendar;
};


export type MutationCreateAppointmentArgs = {
  input: CreateAppointmentInput;
};


export type MutationCreateCalendarArgs = {
  input: CreateCalendarInput;
};


export type MutationDeleteAppointmentArgs = {
  input: DeleteAppointmentInput;
};


export type MutationDeleteCalendarArgs = {
  input: DeleteCalendarInput;
};


export type MutationUpdateAppointmentArgs = {
  input: UpdateAppointmentInput;
};


export type MutationUpdateCalendarArgs = {
  input: UpdateCalendarInput;
};

export type Query = {
  __typename?: 'Query';
  appointment: Appointment;
  calendar: Calendar;
  listAppointments: Array<Appointment>;
};


export type QueryAppointmentArgs = {
  appointmentId: Scalars['ID']['input'];
};


export type QueryCalendarArgs = {
  calendarId: Scalars['ID']['input'];
};


export type QueryListAppointmentsArgs = {
  input: ListAppointmentsInput;
};

export type UpdateAppointmentInput = {
  appointmentId: Scalars['ID']['input'];
  calendarId?: InputMaybe<Scalars['ID']['input']>;
  durationInMinutes?: InputMaybe<Scalars['Int']['input']>;
  overlap?: InputMaybe<Scalars['Boolean']['input']>;
  startAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCalendarInput = {
  calendarId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};
