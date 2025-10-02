function RightComponent(props) {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold my-5 text-center">{props.title}</h2>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <p style={{ fontSize: "19px" }}>
            {props.paragraphFirst}
          </p>
          <p style={{ fontSize: "19px" }}>
            {props.paragraphSecond}
          </p>
        </div>
        <div className="col-lg-6 col-md-6 text-center">
          <img className="img-fluid" src={props.image} alt={props.alt} />
        </div>
      </div>
    </div>
  );
}
export default RightComponent;
