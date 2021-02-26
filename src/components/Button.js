import React from "react";
//importing classnames library for refactoring Button component
import classnames from "classnames"
import "./Button.scss";
// renders the button element & uses props.children value as button text
export default function Button(props) {
   const buttonClass = classnames("button", {
        //these are classes
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });
 
   return (
     <button
       className={buttonClass}
       onClick={props.onClick} //onClick is a function
       disabled={props.disabled}  //disabled is a boolean value 
     >
       {props.children}
     </button>
   );
 }
 