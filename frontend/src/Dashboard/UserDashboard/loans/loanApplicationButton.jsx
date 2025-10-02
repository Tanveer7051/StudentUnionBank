import AddIcon from '@mui/icons-material/Add';
import './loanApplyButton.css';
import { useNavigate } from 'react-router-dom';

function LoanApplicationButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/loan');
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <button className="loanApply mt-4 mb-4" onClick={handleClick}>
          <AddIcon /> Apply Here
        </button>
      </div>
    </div>
  );
}

export default LoanApplicationButton;
