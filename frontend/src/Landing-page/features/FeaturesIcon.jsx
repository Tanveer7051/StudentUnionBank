import Icons from './Icons';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

function FeatureIcon() {
  return (
    <div className="container mt-5">
      <div className="row">
        <Icons
          icon={<PersonAddIcon />}
          title="Easy Account Opening"
          paragraph="Quick and simple account process"
          link="/"
        />
        <Icons
          icon={<VerifiedUserIcon />}
          title="Secure Transactions"
          paragraph="Your money and data are always safe"
        />
        <Icons
          icon={<SupportAgentIcon />}
          title="24/7 Customer Support"
          paragraph="We’re here whenever you need help"
          link="/feature/supportAggent"
        />
        <Icons
          icon={<SchoolIcon />}
          title="Student-friendly Loans"
          paragraph="Affordable loans for students"
        />
        <Icons
          icon={<ReceiptLongIcon />}
          title="Online Bill Payments"
          paragraph="Pay bills quickly and securely"
        />
        <Icons
          icon={<SmartphoneIcon />}
          title="Mobile Banking App"
          paragraph="Bank on the go with our app"
        />
      </div>
    </div>
  );
}

export default FeatureIcon;
