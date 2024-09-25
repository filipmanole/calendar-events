/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "calendar-events",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    // Create DynamoDB table
    const calendarTable = new sst.aws.Dynamo("CalendarTable", {
      fields: {
        PK: "string",
        SK: "string",
        GSI1PK: "string",
        GSI1SK: "string",
      },
      primaryIndex: { hashKey: "PK", rangeKey: "SK" },
      globalIndexes: {
        GSI1: {
          hashKey: "GSI1PK",
          rangeKey: "GSI1SK",
        },
      },
    });

    // Create AppSync GraphQL API
    const appSync = new sst.aws.AppSync("scheduler-api", {
      schema: "schema.graphql",
      transform: {
        api: {
          authenticationType: "API_KEY",
        },
      },
    });

    // Get calendar query
    const getCalendarFunction = new sst.aws.Function("getCalendar", {
      handler: "src/handlers/calendar/getCalendar.handler",
      link: [calendarTable],
    });

    const getCalendar = appSync.addDataSource({
      name: "getCalendar",
      lambda: getCalendarFunction.arn,
    });

    appSync.addResolver("Query calendar", { dataSource: getCalendar.name });

    // Create calendar mutation
    const createCalendarFunction = new sst.aws.Function("createCalendar", {
      handler: "src/handlers/calendar/createCalendar.handler",
      link: [calendarTable],
    });

    const createCalendar = appSync.addDataSource({
      name: "createCalendar",
      lambda: createCalendarFunction.arn,
    });

    appSync.addResolver("Mutation createCalendar", {
      dataSource: createCalendar.name,
    });

    // Update calendar mutation
    const updateCalendarFunction = new sst.aws.Function("updateCalendar", {
      handler: "src/handlers/calendar/updateCalendar.handler",
      link: [calendarTable],
    });

    const updateCalendar = appSync.addDataSource({
      name: "updateCalendar",
      lambda: updateCalendarFunction.arn,
    });

    appSync.addResolver("Mutation updateCalendar", {
      dataSource: updateCalendar.name,
    });

    // Create Appointment mutation
    const createAppointmentFunction = new sst.aws.Function(
      "createAppointment",
      {
        handler: "src/handlers/appointment/createAppointment.handler",
        link: [calendarTable],
      }
    );

    const createAppointment = appSync.addDataSource({
      name: "createAppointment",
      lambda: createAppointmentFunction.arn,
    });

    appSync.addResolver("Mutation createAppointment", {
      dataSource: createAppointment.name,
    });

    // Update Appointment mutation
    const updateAppointmentFunction = new sst.aws.Function(
      "updateAppointment",
      {
        handler: "src/handlers/appointment/updateAppointment.handler",
        link: [calendarTable],
      }
    );

    const updateAppointment = appSync.addDataSource({
      name: "updateAppointment",
      lambda: updateAppointmentFunction.arn,
    });

    appSync.addResolver("Mutation updateAppointment", {
      dataSource: updateAppointment.name,
    });

    // Get Appointment query
    const getAppointmentFunction = new sst.aws.Function("getAppointment", {
      handler: "src/handlers/appointment/getAppointment.handler",
      link: [calendarTable],
    });

    const getAppointment = appSync.addDataSource({
      name: "getAppointment",
      lambda: getAppointmentFunction.arn,
    });

    appSync.addResolver("Query appointment", {
      dataSource: getAppointment.name,
    });

    // Delete Appointment mutation
    const deleteAppointmentFunction = new sst.aws.Function(
      "deleteAppointment",
      {
        handler: "src/handlers/appointment/deleteAppointment.handler",
        link: [calendarTable],
      }
    );

    const deleteAppointment = appSync.addDataSource({
      name: "deleteAppointment",
      lambda: deleteAppointmentFunction.arn,
    });

    appSync.addResolver("Mutation deleteAppointment", {
      dataSource: deleteAppointment.name,
    });

    // List Appointments query
    const listAppointmentsFunction = new sst.aws.Function("listAppointments", {
      handler: "src/handlers/appointment/listAppointments.handler",
      link: [calendarTable],
    });

    const listAppointments = appSync.addDataSource({
      name: "listAppointments",
      lambda: listAppointmentsFunction.arn,
    });

    appSync.addResolver("Query listAppointments", {
      dataSource: listAppointments.name,
    });
  },
});
