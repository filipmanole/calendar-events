import { AppointmentEntity } from "../../entities/appointment/appointment.entity";
import documentClient from "../dynamoClientWithConfigs";
import { Resource } from "sst";

type DeleteAppointmentProps = {
  appointmentId: string;
};

export const deleteAppointment = async (props: DeleteAppointmentProps) => {
  try {
    await documentClient.delete({
      TableName: Resource.CalendarTable.name,
      Key: {
        PK: `APT#${props.appointmentId}`,
        SK: `APT#${props.appointmentId}`,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    throw Error("Error deleting appointment");
  }
};
