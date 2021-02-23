import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "../Appointment";
import Confirm from "../Appointment/Confirm";
import Empty from "../Appointment/Empty";
import Error from "../Appointment/Error";
import Form from "../Appointment/Form";
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Status from "../Appointment/Status";


afterEach(cleanup);

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

describe("Appointment", () => {
    it("renders without crashing", () => {
      render(<Appointment />);
    });
  });