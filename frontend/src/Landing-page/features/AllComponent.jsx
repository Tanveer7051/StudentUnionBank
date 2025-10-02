import LeftComponent from "./LeftComponent";
import RightComponent from './RightComponet';
function AllComponent() {
    return (
        <>
            <LeftComponent image="AccountOpening.png" alt="Easy Account Opening" title="Easy Account Opening" paragraphFirst={
                <>
                    Opening an account with <b>Student Union Bank</b> is simple, fast, and hassle-free.
                    With just a few basic details and ID proof, you can become a member in minutes
                    and start your journey towards smart banking.
                </>
            } paragraphSecond=" No long queues, no complicated paperwork — we ensure a smooth
            digital onboarding experience for students so they can focus on what
            really matters."/>
            <RightComponent image="Security.png"   alt="Secure Transactions" title="Secure Transactions" paragraphFirst={
                <>
                    At <b>Student Union Bank</b>, your safety is our top priority. Every
                    transaction is protected with advanced encryption and multi-layer
                    security measures.
                </>
            } paragraphSecond="From online payments to fund transfers, we ensure that your money
            and personal data remain safe, giving you complete peace of mind
            while banking with us."/>
            <LeftComponent image="CustomerSupport.png"  alt="Customer Support" title="24/7 Customer Support" paragraphFirst=" We’re here for you anytime, anywhere. Our dedicated support team is
            available 24/7 to assist with account queries, technical issues, or
            banking guidance. Whether it's day or night, we ensure that help is
            just one call or message away." paragraphSecond={
                    <>
                        <p>
                            ✔️ Live chat support </p>
                        <p>
                            ✔️ Email & phone assistance  </p>
                        <p>
                            ✔️ Quick resolution for all queries
                        </p>
                    </>
                } />
            <RightComponent image="StudentFriendlyLoan.png" alt="Student Friendly Loan" title="🎓 Student-Friendly Loans" paragraphFirst="Our student-friendly loan plans are designed to support your
            education journey without financial stress. With low interest rates,
            flexible repayment options, and quick approval, we make education
            accessible for everyone." paragraphSecond={
                    
                        <ul className="list-unstyled mt-3">
                            <li>✔️ Low interest rates tailored for students</li>
                            <li>✔️ Easy application & quick approval</li>
                            <li>✔️ Flexible repayment options after graduation</li>
                            <li>✔️ Minimal documentation required</li>
                        </ul>
                    
                } />
            <LeftComponent image="OnlineBillPayment.png"  alt="Online Bill Payment" title="💳 Online Bill Payments" paragraphFirst="Pay your bills instantly from the comfort of your home. Our secure
            platform allows you to settle electricity, water, phone, internet,
            and tuition bills in just a few clicks." paragraphSecond={
                    
                        <ul className="list-unstyled mt-3">
                            <li>✔️ Pay utility bills anytime, anywhere</li>
                            <li>✔️ Safe and secure transactions</li>
                            <li>✔️ Get instant payment confirmation</li>
                            <li>✔️ Save time with recurring payments</li>
                        </ul>
                    
                } />
            <RightComponent image="MobileBanking.png" alt="Mobile Banking App" title="📱 Mobile Banking App" paragraphFirst="Manage your finances on the go with our easy-to-use mobile app. Stay 
            connected to your bank anytime, anywhere with just a few taps." paragraphSecond={
                    <ul className="list-unstyled mt-3">
                        <li>✔️ Check balances and transaction history</li>
                        <li>✔️ Instant fund transfers</li>
                        <li>✔️ Pay bills and recharge mobile</li>
                        <li>✔️ Advanced security with biometric login</li>
                    </ul>
                } />

        </>

    );
}

export default AllComponent;