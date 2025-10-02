import Loan from "./Loans";
import LoanApplicationButton from "./loanApplicationButton";
import LoanSummaryCards from "./LoanSummery";
// import LoanFilter from "./SelectOption";
import EMIReminder from "./EmiReminder";
function LoneDashboard() {
    return ( 
        <>
        <LoanApplicationButton/>
        <LoanSummaryCards/>
        {/* <LoanFilter/> */}
        <Loan/>
        <EMIReminder/>
        </>
     );
}

export default LoneDashboard;