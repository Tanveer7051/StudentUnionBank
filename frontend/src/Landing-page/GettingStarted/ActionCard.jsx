import React from "react";
import styles from './ActionCard.module.css';
function ActionCard(props) {
    return ( 
        <>
        <div className={`card ${styles.round} ${styles.Card}`} >
        <div className={`card-body`}>
           <h1 className={`icon ${styles.icon}`}> {props.icon}</h1>
          {/* Use props.text here */}
          <p className={`card-text  ${styles.ActionCardText}`}>{props.text}</p>
        </div>
      </div>
        </>
     );
}

export default ActionCard;