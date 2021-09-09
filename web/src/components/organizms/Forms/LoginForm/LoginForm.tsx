import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import { TextField } from 'src/components/shared/atoms/TextField/TextFieldBordered';
import { useLoginMutation } from 'src/generated/graphql';
import { toErrorMap } from 'src/utils/toErrorMap';
import ButtonSubmit from '../../../shared/atoms/Buttons/ButtonSubmit';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
  })
);

// TO-DO: remember me

export function LoginForm() {
  const classes = useStyles();
  const history = useHistory()
  const [, login] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    onSubmit: async (values, { setErrors }) => {
      const result = await login({
        loginInput: values,
      });

      if (result.data?.login.errors) {
        const mappedErrors = toErrorMap(result.data?.login.errors)
        setErrors(mappedErrors)
      } else {
        history.push('/home');
      }
    },
  });

  // TO-DO: change notification to alert
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="usernameOrEmail"
            name="usernameOrEmail"
            label="Email Address"
            variant="outlined"
            margin="normal"
            autoComplete="email"
            autoFocus
            type="text"
            value={formik.values.usernameOrEmail}
            onChange={formik.handleChange}
            error={formik.touched.usernameOrEmail && Boolean(formik.errors.usernameOrEmail)}
            helperText={formik.touched.usernameOrEmail && formik.errors.usernameOrEmail}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <ButtonSubmit color="primary" type="submit">
            submit
          </ButtonSubmit>
        </form>
      </div>
    </Container>
  );
}
