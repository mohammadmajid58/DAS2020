import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { Button } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import LockIcon from "@material-ui/icons/Lock";
import Axios, { AxiosResponse } from "axios";
import API_URL from "./../../index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(4),
      flexGrow: 1,
      background: "#0F54B0"
    },
    header: {
      textAlign: "center",
      background: "#0F54B0",
      font: "Verdana",
      color: "#fff"
    },
    card: {
      marginTop: theme.spacing(10),
      width: "100%"
    }
  })
);

const Login = () => {
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
          localStorage.setItem("login", "yes");
          setHelperText("Login Successful");
          document.location.href = "/";
        }
      })
      .catch(() => {
        setError(true);
        localStorage.setItem("login", "no");
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
                inputProps={LockIcon}
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
