import React from "react";
interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = props => {
  const title = props.title;
  const style = {
    color: "white",
    backgroundColor: "#7794ba",
    padding: "2em",
    marginBottom: "2em",
    fontFamily: "Arial"
  };
  return (
    <div style={style} className="d-flex justify-content-center">
      <h3>{title}</h3>
    </div>
  );
};

export default PageTitle;
