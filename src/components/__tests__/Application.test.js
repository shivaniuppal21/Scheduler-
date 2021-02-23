import React from "react";

import { render, cleanup, waitForElement, getByText, fireEvent} from "@testing-library/react";

import Application from "../Application";

afterEach(cleanup);
// beforeEach(() => {
//   jest.clearAllMocks();
//   jest.setTimeout(10000);
// });
//describe("Application", () => {
it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

   fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
})
//})