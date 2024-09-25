import { Appointment } from "../../appsync";
import documentClient from "../dynamoClientWithConfigs";
import { Resource } from "sst";

type GetAppointmentProps = {
  appointmentId: string;
};

export const getAppointment = async (props: GetAppointmentProps) => {
  try {
    const getResponse = await documentClient.get({
      TableName: Resource.CalendarTable.name,
      Key: {
        PK: `APT#${props.appointmentId}`,
        SK: `APT#${props.appointmentId}`,
      },
    });

    return getResponse.Item as Appointment;
  } catch (error) {
    console.log(error);
    throw Error("Error getting appointment");
  }
};
