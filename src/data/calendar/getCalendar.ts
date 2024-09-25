import { Calendar } from "../../appsync";
import documentClient from "../dynamoClientWithConfigs";
import { Resource } from "sst";

type GetCalendarProps = {
  calendarId: string;
};

export const getCalendar = async (props: GetCalendarProps) => {
  try {
    const getResponse = await documentClient.get({
      TableName: Resource.CalendarTable.name,
      Key: {
        PK: `CAL#${props.calendarId}`,
        SK: `CAL#${props.calendarId}`,
      },
    });

    return getResponse.Item as Calendar;
  } catch (error) {
    console.log(error);
    throw Error("Error getting calendar");
  }
};
