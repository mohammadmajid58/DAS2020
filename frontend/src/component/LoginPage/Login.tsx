import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { themeStyles } from "../DesignElements/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { Button } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import { getCookie } from "../../abstract_functions";

import Axios, { AxiosResponse } from "axios";
import API_URL from "./../../index";

const useStyles = themeStyles();

interface AuthenticateUser {
  authenticateUser: () => void;
}

const Login = (props: AuthenticateUser) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  const handleLogin = () => {
    const POST_URL = API_URL + "/auth/login/";
    const inputData = {
      username: username,
      password: password
    };
    Axios.post(`${POST_URL}`, inputData)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setError(false);
          Axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");
          setHelperText("Login Successful");
          props.authenticateUser();
        }
      })
      .catch(() => {
        setError(true);
        setHelperText("Incorrect username or password!");
      });
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin();
    }
  };

  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="DAS Login" />
          <CardContent>
            <div>
              <TextField
                error={error}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={e => setUsername(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}
              />

              <TextField
                error={error}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={helperText}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              onClick={() => handleLogin()}
              disabled={isButtonDisabled}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </React.Fragment>
  );
};

export default Login;
