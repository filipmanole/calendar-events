import { AppSyncResolverHandler } from "aws-lambda";
import { Appointment, MutationUpdateAppointmentArgs } from "../../appsync";
import { updateAppointment } from "../../data/appointment/updateAppointment";

export const handler: AppSyncResolverHandler<
  MutationUpdateAppointmentArgs,
  Appointment
> = async (event) => {
  return updateAppointment(event.arguments.input);
};
