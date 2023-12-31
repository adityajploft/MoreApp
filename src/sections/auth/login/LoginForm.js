import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { registerSchema  } from '../../../utils/ValidatianSchema';

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  // const [formCompleted, setFormCompleted] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    password: ''
  });

  // useEffect(() => {
  //   const isFormCompleted =
  //     formData.first_name !== '' &&
  //     formData.last_name !== '' &&
  //     formData.email !== '' &&
  //     formData.mobile !== '';

  //   setFormCompleted(isFormCompleted);
  // }, [formData]);

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = async (values) => {
    try {
      const response = await axios.post('/register', values);

      console.log(response.data, 'hlooooo');
      navigate('/otp', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={registerSchema}
      onSubmit={handleClick}
    >
      <Form style={{ border: '1px solid black', padding: '20px', borderRadius: '5px' }}>
        <Stack spacing={3}>
          <Field name="first_name">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="First Name"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Field name="last_name">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Last Name"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Field name="email">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Email address"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Field name="mobile">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Mobile"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          // disabled={!formCompleted}
        >
          Register
        </LoadingButton>
      </Form>
    </Formik>
  );
}
