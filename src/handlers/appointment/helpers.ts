import { Appointment } from "../../appsync";
import { listAppointments } from "../../data/appointment/listAppointments";

export const isOverlappingTimeRange = async (
  appointments: Appointment[],
  // calendarId: string,
  startAt: string,
  endAt: string
) => {
  // const appointments = await listAppointments({
  //   calendarId: calendarId,
  //   date: new Date(startAt),
  //   type: "DAY",
  // });

  return appointments.some(
    (appointment) =>
      +new Date(appointment.startAt) < +new Date(endAt) &&
      +new Date(appointment.endAt) > +new Date(startAt)
  );
};

export const getDateAfterMinutes = (date: Date, minutes: number) =>
  new Date(+new Date(date) + minutes * 60000).toISOString();
