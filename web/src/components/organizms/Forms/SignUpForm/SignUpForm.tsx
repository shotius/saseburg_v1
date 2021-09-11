import { FormControl, InputLabel, Select } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import moment from "moment";
import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "src/components/shared/molecules/alerts/authError";
import { useAppDispatch, useAppSelector } from "src/redux_tk/app/hook";
import {
  registerUserAsync
} from "src/redux_tk/features/auth/authSlice";
import ButtonSubmit from "../../../shared/atoms/Buttons/ButtonSubmit";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatching, setIsPasswordMatching] = useState(true);
  const classes = useStyles();

  const { errors } =
    useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const history = useHistory();

  // const onSubmit = async (e: FormEvent) => {
  //   e.preventDefault();

  //   if (validatePassword()) {
  //     const newUser: IUser = {
  //       firstName,
  //       lastName,
  //       email,
  //       dateOfBirth,
  //       sex: Number(sex),
  //       password,
  //     };
  //     dispatch(registerUserAsync(newUser));
  //   }
  // };

  const validatePassword = () => {
    if (password === confirmPassword) {
      setIsPasswordMatching(true);
      return true;
    } else {
      setIsPasswordMatching(false);
      return false;
    }
  };

  return (
    <>
      {/* {registerSuccess && <Alert message="You signed up successfuly" severity="success"/>} */}
      {/* {true  && <Alert message="message" severity="error"/>} */}
      {errors && <Alert errors={errors} />}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          
        </div>
      </Container>
    </>
  );
}

{/* <form className={classes.form} noValidate onSubmit={onSubmit}></form> */}
{/* 

<Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={false}
                  autoComplete="firstName"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required variant="outlined" fullWidth>
                  <InputLabel htmlFor="sex">Sex</InputLabel>
                  <Select
                    required
                    native
                    value={sex}
                    onChange={(e: any) => setSex(e.target.value)}
                    name="sex"
                    label="sex"
                    inputProps={{
                      id: "sex",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                    <option value={3}>Other</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  name="date"
                  id="date"
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="none"
                  error={!isPasswordMatching}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="none"
                  error={!isPasswordMatching}
                />
              </Grid>
            </Grid>
            <ButtonSubmit color="primary">Sign Up</ButtonSubmit>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form> */}
