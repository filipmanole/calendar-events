import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import documentClient from "../dynamoClientWithConfigs";
import { Calendar } from "../../appsync";
import { Resource } from "sst";

type UpdateCalendarProps = {
  calendarId: string;
  name: string;
};

export const updateCalendar = async (props: UpdateCalendarProps) => {
  try {
    const { calendarId, ...fieldsToUpdate } = props;
    const itemKeys = Object.keys(fieldsToUpdate);

    const updateUser = await documentClient.send(
      new UpdateCommand({
        TableName: Resource.CalendarTable.name,
        UpdateExpression: `SET ${itemKeys
          .map((k, index) => `#field${index} = :value${index}`)
          .join(", ")}`,
        ExpressionAttributeNames: itemKeys.reduce(
          (accumulator, k, index) => ({
            ...accumulator,
            [`#field${index}`]: k,
          }),
          {}
        ),
        ExpressionAttributeValues: itemKeys.reduce(
          (accumulator, k, index) => ({
            ...accumulator,
            [`:value${index}`]:
              fieldsToUpdate[k as keyof typeof fieldsToUpdate],
          }),
          {}
        ),
        Key: {
          PK: `CAL#${calendarId}`,
          SK: `CAL#${calendarId}`,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return updateUser.Attributes as Calendar;
  } catch (error) {
    console.log(error);
    throw Error("Error updating calendar");
  }
};
