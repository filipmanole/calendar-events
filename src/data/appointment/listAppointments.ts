import { getDay, getWeek, getYear } from "date-fns";
import { Appointment } from "../../appsync";
import documentClient from "../dynamoClientWithConfigs";
import { Resource } from "sst";

type ListAppointmentsProps = {
  calendarId: string;
  type: "DAY" | "WEEK";
  date: Date;
};

export const listAppointments = async (props: ListAppointmentsProps) => {
  const { calendarId, type, date } = props;
  const year = getYear(date);
  const week = getWeek(date);
  const day = getDay(date);

  try {
    const appointments = await documentClient.query({
      TableName: Resource.CalendarTable.name,
      ScanIndexForward: true,
      IndexName: "GSI1",
      KeyConditionExpression:
        "#gsi1pk = :gsi1pk AND begins_with(#gsi1sk, :gsi1sk)",
      ExpressionAttributeNames: {
        "#gsi1pk": "GSI1PK",
        "#gsi1sk": "GSI1SK",
      },
      ExpressionAttributeValues: {
        ":gsi1pk": `CAL#${calendarId}#YEAR#${year}#WEEK#${week}`,
        ":gsi1sk": type === "WEEK" ? "DAY#" : `DAY#${day}`,
      },
    });

    return appointments.Items as Appointment[];
  } catch (error) {
    console.log(error);
    throw Error("Error getting appointment");
  }
};
