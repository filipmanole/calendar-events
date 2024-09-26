import { gql } from "graphql-request";
import {
  CreateAppointmentInput,
  DeleteAppointmentInput,
  ListAppointmentsInput,
  UpdateAppointmentInput,
} from "../../src/appsync";

export const createAppointment = ({
  calendarId,
  title,
  startAt,
  durationInMinutes,
  overlap,
}: CreateAppointmentInput) => gql`
  mutation CreateAppointment {
    createAppointment(
      input: {
        calendarId: ${calendarId}
        title: ${title}
        startAt: ${startAt}
        durationInMinutes: ${durationInMinutes}
        overlap: ${overlap}
      }
    ) {
      appointmentId
      calendarId
      title
      startAt
      endAt
      createdAt
      updatedAt
    }
  }
`;

export const deleteAppointment = ({
  appointmentId,
}: DeleteAppointmentInput) => gql`
  mutation DeleteAppointment {
    deleteAppointment(input: { appointmentId: ${appointmentId} })
  }
`;

export const getAppointment = (appointmentId: string) => gql`
  query GetAppointment {
    getAppointment(appointmentId: ${appointmentId}) {
      appointmentId
      calendarId
      title
      startAt
      endAt
      createdAt
      updatedAt
    }
  }
`;

export const updateAppointment = ({
  appointmentId,
  title,
  startAt,
  durationInMinutes,
  overlap,
}: UpdateAppointmentInput) => gql`
  mutation UpdateAppointment {
    updateAppointment(
      input: {
        appointmentId: ${appointmentId}
        title: ${title}
        startAt: ${startAt}
        durationInMinutes: ${durationInMinutes}
        overlap: ${overlap}
      }
    ) {
      appointmentId
      calendarId
      title
      startAt
      endAt
      createdAt
      updatedAt
    }
  }
`;

export const listAppointments = ({
  calendarId,
  type,
  date,
}: ListAppointmentsInput) => gql`
  query ListAppointments {
    listAppointments(
      input: {
        calendarId: ${calendarId}
        type: ${type}
        date: ${date}
      }
    ) {
      appointmentId
      calendarId
      title
      startAt
      endAt
      createdAt
      updatedAt
    }
  }
`;
