import React from 'react';
import './styles.scss';

import Header from './Header';
import Show from './Show'
import Empty from './Empty';
import Status from './Status';

import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
        transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(()=>transition(ERROR_SAVE), true);  
}
function remove() {
  //if (mode === CONFIRM) {
  transition(DELETE,true)
    props.cancelInterview(props.id)
    .then(()=>{
      transition(EMPTY);
    }).catch(()=>{transition(ERROR_DELETE,true)});
  }
  //else{
    //transition(CONFIRM)
  //}
//}
  function edit() {
    transition(EDIT);
  }
    return (
        <article className="appointment" data-testid="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {()=>transition(CONFIRM)}
          onEdit = {()=>{transition(EDIT)}}
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
        {mode === DELETE && <Status message="Deleting" />}
        {mode === CONFIRM && <Confirm onCancel= {back} onConfirm = {remove}/>}
        {mode === EDIT && (<Form interviewers={props.interviewers} name = {props.name} onSave = {save} onCancel={back}/>)}
        {mode === ERROR_SAVE && 
        <Error 
          message="Could not create appointment"
          onClose={back}
        />
      }
      {mode === ERROR_DELETE && 
        <Error 
          message="Could not cancel appointment"
          onClose={back}
        />
      }
       </article>
    );
    }