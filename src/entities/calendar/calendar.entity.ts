import { Calendar } from "../../appsync";
import { generateKSUID, Optional } from "../utils";

type CalendarProps = Optional<
  Calendar,
  "calendarId" | "createdAt" | "updatedAt"
>;

export class CalendarEntity {
  calendarId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: CalendarProps) {
    Object.assign(this, props);

    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
    if (!this.calendarId) this.calendarId = generateKSUID(this.createdAt);
  }

  get PK() {
    return `CAL#${this.calendarId}`;
  }

  get SK() {
    return `CAL#${this.calendarId}`;
  }

  toDto(): Calendar {
    return {
      calendarId: this.calendarId,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  toItem() {
    return {
      ...this.toDto(),
      PK: this.PK,
      SK: this.SK,
      type: "Calendar",
    };
  }
}
