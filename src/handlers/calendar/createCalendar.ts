import { AppSyncResolverHandler } from "aws-lambda";
import { Calendar, MutationCreateCalendarArgs } from "../../appsync";
import { createCalendar } from "../../data/calendar/createCalendar";

export const handler: AppSyncResolverHandler<
  MutationCreateCalendarArgs,
  Calendar
> = async (event) => {
  return createCalendar(event.arguments.input);
};
