import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { TextField } from "components/atoms/TextField/TextFieldBordered";
import ButtonSubmit from "../../../atoms/Buttons/ButtonSubmit";
import { useAppDispatch, useAppSelector } from "redux_tk/app/hook";
import { loginUser, toggleRegisterSuccess } from "redux_tk";
import { Snackbar } from "@material-ui/core";
import { AUTH_TOKEN, SM_THEME, THEME_LIGHT } from "utils/const/constants";
import { changeTheme } from "redux_tk/features/display/displaySlice";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
  })
);

// TO-DO: remember me

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const history = useHistory()
  const [open, setOpen] = useState(true);


  const { token, registerSuccess } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      // set token in localstorage
      localStorage.setItem(AUTH_TOKEN, token);
      // set theme "light" theme
      if (!localStorage.getItem(SM_THEME)) {
        dispatch(changeTheme(THEME_LIGHT))
      }
      
      history.push('/home')

      if (registerSuccess) {
        setTimeout(() => {
          dispatch(toggleRegisterSuccess(false));
        }, 3000); //
      }
    }
  }, [token, history, dispatch, registerSuccess]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const credentials: ILoginCredentials = {
      email,
      password,
    };
    dispatch(loginUser(credentials));
  };

  const handleClose = () => {
    setOpen(false);
  };

  // TO-DO: change notification to alert
  return (
    <Container component="main" maxWidth="xs">
      {registerSuccess && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <p>This is a success message!</p>
        </Snackbar>
      )}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="text"
          />
          <TextField
            variant="outlined"
            required
            label="Password"
            margin="normal"
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            className
          /> */}
          <ButtonSubmit color="primary">SignIn</ButtonSubmit>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/signUp">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}


