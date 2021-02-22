import React from "react";
import { useState } from 'react';
import "./styles.scss";
import Button from "../Button.js";
import InterviewerList from "../InterviewerList.js";

export default function Form(props) {
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset() {
    setInterviewer(null);
    setName("");
  }
  function cancel() {
    reset()
    props.onCancel()
  }
  /*function save() {
    props.onSave(name, interviewer);
  }*/

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={event => {
             setName(event.target.value);
          }}
          data-testid="student-name-input"
        />
        {error && <section className="appointment__validation">{error}</section> }
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}