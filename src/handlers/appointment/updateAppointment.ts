import { AppSyncResolverHandler } from "aws-lambda";
import { Appointment, MutationUpdateAppointmentArgs } from "../../appsync";
import { updateAppointment } from "../../data/appointment/updateAppointment";
import { getDateAfterMinutes, isOverlappingTimeRange } from "./helpers";
import { listAppointments } from "../../data/appointment/listAppointments";
import { getAppointment } from "../../data/appointment/getAppointment";

export const handler: AppSyncResolverHandler<
  MutationUpdateAppointmentArgs,
  Appointment
> = async (event) => {
  const {
    appointmentId,
    calendarId,
    title,
    durationInMinutes,
    startAt,
    overlap,
  } = event.arguments.input;
  const appointment = await getAppointment({ appointmentId });

  if (!calendarId && !title && !durationInMinutes && !startAt)
    return appointment;

  const oldDurationInMinutes =
    (+new Date(appointment.endAt) - +new Date(appointment.startAt)) / 60000;

  const newStartAt = startAt ?? appointment.startAt;
  const newDurationInMinutes = durationInMinutes ?? oldDurationInMinutes;
  const newEndAt = getDateAfterMinutes(
    new Date(newStartAt),
    newDurationInMinutes
  );

  const newAppointment = {
    appointmentId: appointment.appointmentId,
    calendarId: calendarId ?? appointment.calendarId,
    title: title ?? appointment.title,
    startAt: newStartAt,
    endAt: newEndAt,
    updatedAt: new Date().toISOString(),
  };

  const appointments = await listAppointments({
    calendarId: newAppointment.calendarId,
    date: new Date(startAt),
    type: "DAY",
  });

  if (!overlap) {
    const isOverlapping = await isOverlappingTimeRange(
      appointments.filter((a) => a.appointmentId !== appointmentId),
      newStartAt,
      newEndAt
    );

    if (isOverlapping)
      throw new Error("Time range overlaps with an existing appointment");
  }

  return updateAppointment(newAppointment);
};
