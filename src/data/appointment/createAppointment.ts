import { AppointmentEntity } from "../../entities/appointment/appointment.entity";
import documentClient from "../dynamoClientWithConfigs";
import { Resource } from "sst";
import { listAppointments } from "./listAppointments";

type CreateAppointmentProps = {
  calendarId: string;
  title: string;
  startAt: string;
  endAt: string;
  overlap: boolean;
};

export const createAppointment = async (props: CreateAppointmentProps) => {
  if (!props.overlap) {
    const appointments = await listAppointments({
      calendarId: props.calendarId,
      date: new Date(props.startAt),
      type: "DAY",
    });

    const isOverlapping = appointments.some(
      (appointment) =>
        +new Date(appointment.startAt) < +new Date(props.endAt) &&
        +new Date(appointment.endAt) > +new Date(props.startAt)
    );

    if (isOverlapping) {
      throw Error("Overlapping with existing appointment");
    }
  }

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
