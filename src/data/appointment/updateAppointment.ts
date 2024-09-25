import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import documentClient from "../dynamoClientWithConfigs";
import { Appointment } from "../../appsync";
import { Resource } from "sst";

type UpdateAppointmentProps = {
  appointmentId: string;
  title?: string;
  startAt?: string;
  endAt?: string;
};

export const updateAppointment = async (props: UpdateAppointmentProps) => {
  try {
    const { appointmentId, ...fieldsToUpdate } = props;
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
          PK: `APT#${appointmentId}`,
          SK: `APT#${appointmentId}`,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return updateUser.Attributes as Appointment;
  } catch (error) {
    console.log(error);
    throw Error("Error updating appointment");
  }
};
