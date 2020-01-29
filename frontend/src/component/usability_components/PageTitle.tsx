import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = props => {
  const title = props.title;
  return (
    <div className="d-flex justify-content-center">
      <h3>{title}</h3>
    </div>
  );
};

export default PageTitle;
