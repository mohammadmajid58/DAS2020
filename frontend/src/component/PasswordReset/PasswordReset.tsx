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

  const reset = () => {
    if (password.length < 8 || confirmPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const urlElements = document.URL.split("/");
    const numOfUrlElements = urlElements.length;

    const token = urlElements[numOfUrlElements - 2];
    const uid = urlElements[numOfUrlElements - 3];

    const data = {
      new_password1: password,
      new_password2: confirmPassword,
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
          if (errors.includes("This password is too common.")) {
            alert("Choose another password, this password is too common.");
          }
          if (errors.includes("This password is entirely numeric.")) {
            alert(
              "Choose another password, this password is entirely numeric."
            );
          }
          if (errors.includes("The password is too similar to")) {
            alert(
              "Choose another password, this password is too similar your other personal information."
            );
          }
        }
      });
  };

  return (
    <div>
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={event => event.preventDefault()}
      >
        <Card className={classes.card}>
          <CardHeader
            className={classes.header}
            title="Choose a New Password"
          />
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
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="secondary"
              className={classes.loginBtn}
              onClick={() => reset()}
            >
              Reset
            </Button>
          </CardActions>
          <CardContent>
            <p>Your password:</p>
            <ul>
              <li>must contain at least 8 characters</li>
              <li>must not be entirely numeric</li>
              <li>must not be a commonly used password</li>
              <li>must not be too similar to your email address or name</li>
            </ul>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default PasswordReset;
