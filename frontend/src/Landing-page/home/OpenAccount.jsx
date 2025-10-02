import React from 'react';
import Card from './Card';
import SecurityIcon from '@mui/icons-material/Security';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import styles from './OpenAccount.module.css';

function App() {
  return (
    <>
    <h2 className={styles.h2}>Experienve Banking Reimagined</h2>
        <div className={styles.Card}>
      {/* Send props to the MyCard component */}
      <Card title="Secure & Fast Transactions" text="Deposit, withdraw, and transfer funds with industry-leading security." icon={<SecurityIcon  style={{ fontSize: '3rem' }} />} />
      <Card title="Intuitive Online Banking" text="Access your accounts, view statements, and manage cards with ease." icon={<MobileFriendlyIcon  style={{ fontSize: '3rem' }} />}/>
      <Card title="Real Time Account Insight" text="Access Account Information in real time" icon={<ShowChartIcon  style={{ fontSize: '3rem' }} />}/>
    </div>
    </>
  );
}

export default App;