import React from "react";
import { Button } from "@material-ui/core";
import Axios, { AxiosResponse } from "axios";
import API_URL from "../../index";

const reset = () => {
  Axios.post(`${API_URL}/api/reset_database/`)
    .then((response: AxiosResponse) => {
      if (response.status === 201) {
        alert("Success");
      } else {
        alert("Error");
      }
    })
    .catch(function() {
      alert("Error occured");
    });
};

const TempResetDatabase: React.FC = props => {
  return (
    <div className="d-flex justify-content-center">
      <div className="center">
        <Button onClick={() => reset()} variant="contained" color="secondary">
          Reset Database
        </Button>
      </div>
    </div>
  );
};

export default TempResetDatabase;
