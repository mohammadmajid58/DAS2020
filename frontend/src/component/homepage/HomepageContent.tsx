import React from "react";
import "./HomepageContent.css";
import { Timeline } from "react-twitter-widgets";

const HomepageContent: React.FC = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="left">
        <p className="home-text">
          [Date and time]<br/><br/>
          Hello [User],<br/>
          Welcome to DAS 2020.<br/><br/>
          Use the navigation options above to upload or view student data.<br/>
        </p>
        <p className="home-text">
          For guidance on how to use the system, view the documentation <u>here</u>.<br/>
          To report a problem, contact your <u>system administrator</u>.
        </p>
      </div>
      <div className="right">
        <Timeline dataSource={ { sourceType: "profile", screenName: "UofGChem" } }
          options={ { userName: "UofGChem", height: "300", width: "250", margin: 0.25 } }
          onLoad={() => console.log("Twitter Feed loaded!")} />
      </div>
    </div>
  );
};

export default HomepageContent;
