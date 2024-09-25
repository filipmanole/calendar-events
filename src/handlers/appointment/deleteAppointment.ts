import { AppSyncResolverHandler } from "aws-lambda";
import { Scalars, MutationDeleteAppointmentArgs } from "../../appsync";
import { deleteAppointment } from "../../data/appointment/deleteAppointment";

export const handler: AppSyncResolverHandler<
  MutationDeleteAppointmentArgs,
  Scalars["Boolean"]["output"]
> = async (event) => {
  return deleteAppointment({
    appointmentId: event.arguments.input.appointmentId,
  });
};
