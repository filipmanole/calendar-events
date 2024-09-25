import { AppSyncResolverHandler } from "aws-lambda";
import { Appointment, MutationCreateAppointmentArgs } from "../../appsync";
import { createAppointment } from "../../data/appointment/createAppointment";

const getDateAfterMinutes = (date: Date, minutes: number) =>
  new Date(+new Date(date) + minutes * 60000).toISOString();

export const handler: AppSyncResolverHandler<
  MutationCreateAppointmentArgs,
  Appointment
> = async (event) => {
  const { durationInMinutes, ...rest } = event.arguments.input;

  return createAppointment({
    ...rest,
    endAt: getDateAfterMinutes(new Date(rest.startAt), durationInMinutes),
  });
};
