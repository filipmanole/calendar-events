import { gql } from "graphql-request";
import {
  DeleteCalendarInput,
  CreateCalendarInput,
  UpdateCalendarInput,
} from "../../src/appsync";

export const createCalendar = ({ name }: CreateCalendarInput) => gql`
  mutation CreateCalendar($name: String!) {
    createCalendar(input: { name: ${name} }) {
      calendarId
      name
      createdAt
      updatedAt
    }
  }
`;

export const deleteCalendar = ({ calendarId }: DeleteCalendarInput) => gql`
  mutation DeleteCalendar {
    deleteCalendar(input: { calendarId: ${calendarId} })
  }
`;

export const updateCalendar = ({
  calendarId,
  name,
}: UpdateCalendarInput) => gql`
  mutation UpdateCalendar {
    updateCalendar(input: { calendarId: ${calendarId}, name: ${name} }) {
      calendarId
      name
      createdAt
      updatedAt
    }
`;

export const getCalendar = (calendarId: string) => gql` 
  query GetCalendar {
    getCalendar(calendarId: ${calendarId}) {
      calendarId
      name
      createdAt
      updatedAt
    }
`;
