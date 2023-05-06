import EventCard from "./EventCard";
import { render } from "@testing-library/react";
import React from "react";

test("renders title correctly", () => {
  const event = {
    title: "Test Event",
    organizer: "Test Organizer"
  };
  const { getByText } = render(<EventCard event={event} />);
  expect(getByText("Test Event")).toBeInTheDocument();
});

test("renders organizer correctly", () => {
  const event = {
    title: "Test Event",
    organizer: "Test Organizer"
  };
  const { getByText } = render(<EventCard event={event} />);
  expect(getByText("Test Organizer")).toBeInTheDocument();
});

