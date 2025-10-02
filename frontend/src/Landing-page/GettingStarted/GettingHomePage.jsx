import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ActionCard from './ActionCard';
import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function GettingStarted() {
    return ( 
        <>
        <h1 className={`${styles.gettingStarted}`}>Getting Started Is Simple</h1>
        <div className={`${styles.Card} ${styles.ActionCard}`}>
         <Link style={{textDecoration:"none"}} to="/signup"><ActionCard icon={<PersonOutlineIcon/>} text="Sign Up"/></Link>
       <Link style={{textDecoration:"none"}} to="oppenaccount"> <ActionCard icon={<CreditCardIcon/>} text="Start Banking"/></Link>
        <Link style={{textDecoration:"none"}} to="/loan"><ActionCard icon={<AttachMoneyIcon/>} text="Take Loan"/></Link>
        </div>
        <Link  to="/signup"><div className={`btn ${styles.btn_join}`}>Join Student Bank Union</div></Link>
        </>
     );
}

export default GettingStarted;