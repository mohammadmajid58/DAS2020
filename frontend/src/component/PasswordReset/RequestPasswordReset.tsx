import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Axios, { AxiosResponse } from "axios";
import API_URL from "../../index";
import TextField from "@material-ui/core/TextField";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import { themeStyles } from "../DesignElements/styles";

const useStyles = themeStyles();

interface State {
  email: string;
}

const RequestPasswordReset = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const reset = (emailAddress: string) => {
    if (emailAddress.length === 0) {
      alert("Please enter an email address");
      return;
    }
    if (!emailAddress.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    Axios.post(`${API_URL}/auth/password/reset/`, { email: emailAddress })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          alert("Success, please check your email");
        }
      })
      .catch(error => {
        alert("Error");
        console.log(error);
      });
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      reset(e.target.value);
    }
  };

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader
            className={classes.header}
            title="Password Change Request"
          />
          <CardContent>
            <TextField
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              onChange={e => setEmail(e.target.value)}
              onKeyPress={e => handleKeyPress(e)}
            />
          </CardContent>

          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              onClick={() => reset(email)}
            >
              Request Password Reset
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export default RequestPasswordReset;
