import { AppSyncResolverHandler } from "aws-lambda";
import { QueryCalendarArgs, Calendar } from "../../appsync";
import { getCalendar } from "../../data/calendar/getCalendar";
import { Resource } from "sst";

export const handler: AppSyncResolverHandler<
  QueryCalendarArgs,
  Calendar
> = async (event) => {
  console.log(Resource.CalendarTable.name);
  return getCalendar({
    calendarId: event.arguments.calendarId,
  });
};
