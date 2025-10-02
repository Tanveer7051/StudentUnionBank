import React from 'react';
import styles from './Card.module.css';

function MyCard(props) {
  return ( 
    <>
      <div className={`card ${styles.Card}`} style={{ width: '18rem' }}>
        <div className="card-body">
          <h1 className={styles.icon}>{props.icon}</h1>
          <h5 className="card-title">{props.title}</h5>
          <p className={`card-text ${styles.CardText}`}>{props.text}</p>
        </div>
      </div>
    </>
  );
}

export default MyCard;
