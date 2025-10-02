import './Button.css';
function Button(props) {
    return (
        <>
    <button type='submit' className="signUpBtn">{props.title}</button>
   <p style={{fontSize:"19px"}}>{props.paragraph}
   <button style={{color:"#0D6EFD" , fontSize:"19px"}} className='btn' type="submit">{props.value}</button>
   </p>
    </>
    );
}

export default Button;