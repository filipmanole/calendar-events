import { AppSyncResolverHandler } from "aws-lambda";
import { Appointment, QueryListAppointmentsArgs } from "../../appsync";
import { listAppointments } from "../../data/appointment/listAppointments";

export const handler: AppSyncResolverHandler<
  QueryListAppointmentsArgs,
  Array<Appointment>
> = async (event) => {
  const { calendarId, type, date } = event.arguments.input;

  const appointments = listAppointments({
    calendarId,
    type,
    date: new Date(date),
  });

  return appointments;
};
