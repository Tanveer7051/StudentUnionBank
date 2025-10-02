import React from "react";
import './icon.css'

function Icons(props) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-8 icon text-center mb-4">
      {props.link ? (
        <a href={props.link} className="icon-link">
          {props.icon}
        </a>
      ) : (
        props.icon
      )}
      <h3>{props.title}</h3>
      <p>{props.paragraph}</p>
    </div>
  );
}

export default Icons;
