import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import API_URL from "../../index";
import Axios, { AxiosResponse } from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import { themeStyles } from "../DesignElements/styles";

const useStyles = themeStyles();

const PasswordReset = () => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const reset = (confirmPass: string) => {
    if (password.length < 8 || confirmPass.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    const urlElements = document.URL.split("/");
    const numOfUrlElements = urlElements.length;

    const token = urlElements[numOfUrlElements - 2];
    const uid = urlElements[numOfUrlElements - 3];

    const data = {
      new_password1: password,
      new_password2: confirmPass,
      uid: uid,
      token: token
    };

    const url = API_URL + "/auth/password/reset/confirm/";

    Axios.post(url, data)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          alert("Success, try logging in!");
          document.location.href = "/login";
        } else {
          alert("Error");
        }
      })
      .catch(error => {
        const responseErrors = error.response.data;
        if ("new_password2" in responseErrors) {
          const errors = responseErrors.new_password2;
          for (var e of errors) {
            alert(e);
          }
        }
      });
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      reset(e.target.value);
    }
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Choose a New Password" />
        <CardContent>
          <TextField
            fullWidth
            id="password1"
            type="password"
            label="Password"
            placeholder="Password"
            margin="normal"
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            id="password2"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            margin="normal"
            onChange={e => setConfirmPassword(e.target.value)}
            onKeyPress={e => handleKeyPress(e)}
          />
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={() => reset(confirmPassword)}
          >
            Reset
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default PasswordReset;
