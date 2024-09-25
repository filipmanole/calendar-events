import { AppSyncResolverHandler } from "aws-lambda";
import { QueryAppointmentArgs, Appointment } from "../../appsync";
import { getAppointment } from "../../data/appointment/getAppointment";

export const handler: AppSyncResolverHandler<
  QueryAppointmentArgs,
  Appointment
> = async (event) => {
  return getAppointment({
    appointmentId: event.arguments.appointmentId,
  });
};
