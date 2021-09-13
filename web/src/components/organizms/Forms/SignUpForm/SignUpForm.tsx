import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Box from 'src/components/shared/atoms/Box';
import { Button } from 'src/components/shared/atoms/Button';
import FormikInputField from 'src/components/shared/molecules/FormikInputField/FormikInputField';
import { useRegisterMutation } from 'src/generated/graphql';
import { toErrorMap } from 'src/utils/toErrorMap';
import { useHistory } from 'react-router';
import useStyles from './styles'
import * as Yup from "yup"

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export function SignUpForm() {
  const classes = useStyles();
  const history = useHistory();
  const [, register] = useRegisterMutation();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              lastName: '',
              firstName: '',
              sex: '',
              birthDate: moment(new Date()).format('YYYY-MM-DD'),
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={async (values, { setErrors }) => {
              const { confirmPassword, ...registerCredentials } = values;
              const response = await register({ registerCredentials });
              
              if (response.data?.register.errors) {
                const mappedErrors = toErrorMap(
                  response.data.register.errors
                  );
                  setErrors(mappedErrors);
                } else {
                  history.push('/login');
                }
              }}
              validate={(values) => {
                const errors: Record<string, string> = {}
                if (values.password !== values.confirmPassword){
                  errors.confirmPassword = "password don't match"
                }
                return errors
              }}
              validationSchema={SignupSchema}
              >
            {({errors, touched, ...props}) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormikInputField name="firstName" label="First Name" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikInputField name="lastName" label="Last Name" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="sex">Sex</InputLabel>
                      <Select
                        value={props.values.sex}
                        onChange={props.handleChange}
                        placeholder="Sex"
                        name="sex"
                        label="sex"
                        id="sex"
                      >
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                        <MenuItem value={'other'}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikInputField
                      required
                      name="birthDate"
                      label="Birth Date"
                      type="date"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikInputField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikInputField
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikInputField
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  fullWidth
                >
                  Sign up
                </Button>
                <Box textAlign="center">
                  Already have an account?<Link to="/login">Sign in</Link>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
}
