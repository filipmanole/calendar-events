import { CalendarEntity } from "../../entities/calendar/calendar.entity";
import documentClient from "../dynamoClientWithConfigs";
import { Resource } from "sst";

type CreateCalendarProps = {
  name: string;
};

export const createCalendar = async (props: CreateCalendarProps) => {
  const calendar = new CalendarEntity(props);
  try {
    await documentClient.put({
      TableName: Resource.CalendarTable.name,
      Item: calendar.toItem(),
      ConditionExpression: "attribute_not_exists(PK)",
    });

    return calendar.toDto();
  } catch (error) {
    console.log(error);
    throw Error("Error creating calendar");
  }
};
