import { Appointment } from "../../appsync";
import { generateKSUID, Optional } from "../utils";
import { getDay, getWeek, getWeekYear, getYear } from "date-fns";

type AppointmentProps = Optional<
  Appointment,
  "appointmentId" | "createdAt" | "updatedAt"
>;

export class AppointmentEntity {
  appointmentId: string;
  calendarId: string;
  title: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: AppointmentProps) {
    const { createdAt, updatedAt, startAt, endAt, ...rest } = props;
    Object.assign(this, rest);

    this.startAt = new Date(startAt);
    this.endAt = new Date(endAt);

    const date = new Date();
    this.createdAt = createdAt ? new Date(createdAt) : date;
    this.updatedAt = updatedAt ? new Date(updatedAt) : date;

    if (!this.appointmentId) this.appointmentId = generateKSUID(date);
  }

  get PK() {
    return `APT#${this.appointmentId}`;
  }

  get SK() {
    return `APT#${this.appointmentId}`;
  }

  get GSI1PK() {
    return `CAL#${this.calendarId}#YEAR#${getYear(this.startAt)}#WEEK#${getWeek(
      this.startAt
    )}`;
  }

  get GSI1SK() {
    return `DAY#${getDay(this.startAt)}#APT#${this.appointmentId}`;
  }

  toDto(): Appointment {
    console.log(JSON.stringify(this, null, 2));
    return {
      appointmentId: this.appointmentId,
      calendarId: this.calendarId,
      title: this.title,
      startAt: this.startAt.toISOString(),
      endAt: this.endAt.toISOString(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  toItem() {
    return {
      ...this.toDto(),
      PK: this.PK,
      SK: this.SK,
      GSI1PK: this.GSI1PK,
      GSI1SK: this.GSI1SK,
      type: "Appointment",
    };
  }
}
