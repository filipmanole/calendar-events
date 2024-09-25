import { AppointmentEntity } from "../../entities/appointment/appointment.entity";
import documentClient from "../dynamoClientWithConfigs";
import { Resource } from "sst";

type CreateAppointmentProps = {
  calendarId: string;
  title: string;
  startAt: string;
  endAt: string;
};

export const createAppointment = async (props: CreateAppointmentProps) => {
  const appointment = new AppointmentEntity(props);
  try {
    await documentClient.put({
      TableName: Resource.CalendarTable.name,
      Item: appointment.toItem(),
      ConditionExpression: "attribute_not_exists(PK)",
    });

    return appointment.toDto();
  } catch (error) {
    console.log(error);
    throw Error("Error creating appointment");
  }
};
