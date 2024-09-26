import assert from "assert";
import { GraphQLClient } from "graphql-request";
// const { GraphQLClient } = require("graphql-request");
import { createCalendar } from "./queries/calendar.queries";

describe("Calendar edpoints tests", () => {
  let client;
  let calendarId;

  beforeAll(() => {
    assert(process.env.GRAPHQL_ENDPOINT);
    assert(process.env.GRAPHQL_API_KEY);

    client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
      headers: {
        "x-api-key": process.env.GRAPHQL_API_KEY,
      },
    });
  });
  it("should create a calendar", async () => {
    const res = await client.request(createCalendar({ name: "Test calendar" }));

    console.log(res);
  });
});
