import React from "react";

interface toggleProp {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  textCaption: String;
}

export default function Toggle(props: toggleProp) {
  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-light border border-dark viewFinalDataButton"
        type="button"
        data-cy-toggle-button
        onClick={props.onClick}
      >
        {props.textCaption}
      </button>
    </div>
  );
}
