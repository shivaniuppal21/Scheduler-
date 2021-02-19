import React from 'react';
import 'components/Appointment/styles.scss';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty';
import Status from 'components/Appointment/Status';

import Form from 'components/Appointment/Form';
import useVisualMode from 'hooks/useVisualMode';


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const ERROR_SAVE = "ERROR_SAVE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 

  function save(name, interviewer) {
    if (name && interviewer) {
        transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

  props.bookInterview(props.id, interview)
    .then(() => transition(SAVING))
  }
}

    return (
        <article className="appointment" data-testid="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
       {mode === CREATE &&
        <Form 
        name={props.name} 
        value={props.value} 
        interviewers={props.interviewers} 
        onCancel={back} 
        onSave={save}/>}
        {mode === SAVING && <Status message="Saving" />}
       </article>
    )
    }