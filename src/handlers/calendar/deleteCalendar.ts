import { AppSyncResolverHandler } from "aws-lambda";
import { Scalars, MutationDeleteCalendarArgs } from "../../appsync";
import { deleteCalendar } from "../../data/calendar/deleteCalendar";

export const handler: AppSyncResolverHandler<
  MutationDeleteCalendarArgs,
  Scalars["Boolean"]["output"]
> = async (event) => {
  return deleteCalendar({
    calendarId: event.arguments.input.calendarId,
  });
};
