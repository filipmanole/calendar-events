import { AppSyncResolverHandler } from "aws-lambda";
import { QueryAppointmentArgs, Appointment } from "../../appsync";
import { Resource } from "sst";
import { getAppointment } from "../../data/appointment/getAppointment";

export const handler: AppSyncResolverHandler<
  QueryAppointmentArgs,
  Appointment
> = async (event) => {
  console.log(Resource.CalendarTable.name);
  return getAppointment({
    appointmentId: event.arguments.appointmentId,
  });
};
