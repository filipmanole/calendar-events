import documentClient from "../dynamoClientWithConfigs";
import { Resource } from "sst";

type DeleteCalendarProps = {
  calendarId: string;
};

export const deleteCalendar = async (props: DeleteCalendarProps) => {
  try {
    await documentClient.delete({
      TableName: Resource.CalendarTable.name,
      Key: {
        PK: `CAL#${props.calendarId}`,
        SK: `CAL#${props.calendarId}`,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    throw Error("Error deleting calendar");
  }
};
