import { AppSyncResolverHandler } from "aws-lambda";
import { Calendar, MutationUpdateCalendarArgs } from "../../appsync";
import { updateCalendar } from "../../data/calendar/updateCalendar";

export const handler: AppSyncResolverHandler<
  MutationUpdateCalendarArgs,
  Calendar
> = async (event) => {
  return updateCalendar(event.arguments.input);
};
