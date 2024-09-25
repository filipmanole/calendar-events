/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "CalendarTable": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "createAppointment": {
      "name": string
      "type": "sst.aws.Function"
    }
    "createCalendar": {
      "name": string
      "type": "sst.aws.Function"
    }
    "deleteAppointment": {
      "name": string
      "type": "sst.aws.Function"
    }
    "getAppointment": {
      "name": string
      "type": "sst.aws.Function"
    }
    "getCalendar": {
      "name": string
      "type": "sst.aws.Function"
    }
    "listAppointments": {
      "name": string
      "type": "sst.aws.Function"
    }
    "scheduler-api": {
      "type": "sst.aws.AppSync"
      "url": string
    }
    "updateAppointment": {
      "name": string
      "type": "sst.aws.Function"
    }
    "updateCalendar": {
      "name": string
      "type": "sst.aws.Function"
    }
  }
}
