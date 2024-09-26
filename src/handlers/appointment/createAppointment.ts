import { AppSyncResolverHandler } from "aws-lambda";
import { Appointment, MutationCreateAppointmentArgs } from "../../appsync";
import { createAppointment } from "../../data/appointment/createAppointment";
import { getDateAfterMinutes, isOverlappingTimeRange } from "./helpers";
import { listAppointments } from "../../data/appointment/listAppointments";

export const handler: AppSyncResolverHandler<
  MutationCreateAppointmentArgs,
  Appointment
> = async (event) => {
  const { durationInMinutes, overlap, ...rest } = event.arguments.input;
  const { calendarId, startAt } = rest;
  const endAt = getDateAfterMinutes(new Date(startAt), durationInMinutes);

  const appointments = await listAppointments({
    calendarId,
    date: new Date(startAt),
    type: "DAY",
  });

  if (!overlap && (await isOverlappingTimeRange(appointments, startAt, endAt)))
    throw new Error("Time range overlaps with existing appointments");

  return createAppointment({ ...rest, endAt });
};
