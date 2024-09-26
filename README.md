# calendar-events

GraphQL API for creating calendars and planning events. Powered with AWS AppSync and DynamoDB.

# How to replicate

You will need to setup an AWS credentials first located in `.aws/credentials`

```sh
# 1. it is recommended to use node version lts/iron
nvm use

# 2. install packages
npm install

# 3. start the application in development mode
AWS_PROFILE='default' npm run start

# 4. start the application in development mode
AWS_PROFILE='default' npm run deploy

```

If schema is modified, you can regenerate all types with:

```
npm codegen
```

# Documentation

## Calendar API

### Create Calendar example

```graphql
mutation CreateCalendar {
  createCalendar(input: { name: "Test Calendar" }) {
    calendarId
    name
    createdAt
    updatedAt
  }
}
```

### Get Calendar example

```graphql
query GetCalendar {
  calendar(calendarId: "2mZE7CTE3ovayxptydn6OAdH4om") {
    calendarId
    name
    createdAt
    updatedAt
  }
}
```

### Update Calendar example

```graphql
mutation UpdateCalendar {
  updateCalendar(
    input: { calendarId: "2mZE7CTE3ovayxptydn6OAdH4om", name: "Filip's Cal" }
  ) {
    calendarId
    name
    createdAt
    updatedAt
  }
}
```

### Delete Calendar example

<br>This does not delete existing appointments linked to it

```graphql
mutation DeleteCalendar {
  deleteCalendar(input: { calendarId: "2mZE7CTE3ovayxptydn6OAdH4om" })
}
```

## Appoiontments API

### Create appointment example

```graphql
mutation CreateAppointment {
  createAppointment(
    input: {
      calendarId: "2mZE7CTE3ovayxptydn6OAdH4om"
      title: "Appointment with Stefan 4"
      startAt: "2024-09-27T14:59:00.000Z"
      durationInMinutes: 60
      overlap: false
    }
  ) {
    appointmentId
    calendarId
    title
    startAt
    endAt
    createdAt
    updatedAt
  }
}
```

### Get appointment example

```graphql
query GetAppointment {
  appointment(appointmentId: "2mZRujisxCLgqONs5GSpviSo1Nh") {
    appointmentId
    calendarId
    title
    startAt
    endAt
    createdAt
    updatedAt
  }
}
```

### Update appointment example

```graphql
mutation UpdateAppointment {
  updateAppointment(
    input: {
      appointmentId: "2mZRujisxCLgqONs5GSpviSo1Nh"
      title: "Appointment with Stef"
    }
  ) {
    appointmentId
    calendarId
    title
    startAt
    endAt
    createdAt
    updatedAt
  }
}
```

### Delete appointment example

```graphql
mutation DeleteAppointment {
  deleteAppointment(input: { appointmentId: "2mZh4onjAHD1v2qHbdBt6MwkdIP" })
}
```

### List appointment example

Type can be `WEEK` or `DAY`.
It will retrive all appointments for a specific day, or for the whole week containing the given date.

```graphql
query ListAppointments {
  listAppointments(
    input: {
      calendarId: "2mZE7CTE3ovayxptydn6OAdH4om"
      type: WEEK
      date: "2024-09-26"
    }
  ) {
    appointmentId
    calendarId
    title
    startAt
    endAt
    createdAt
    updatedAt
  }
}
```
