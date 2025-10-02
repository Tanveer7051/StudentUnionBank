function SingleButton(props){
    return(
       <>
          <div className="col-12 col-lg-12 col-sm-12 text-center mt-4">
            <button className="SubmitBtn">{props.title}</button>
            {/* <button type="submit" className="loanSubmitBtn">Submit Loan Request</button> */}
          </div>
          
          </>
    )
}
export default SingleButton;

