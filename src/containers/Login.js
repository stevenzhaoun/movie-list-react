import { Box, Button, CircularProgress, TextField, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import useUser from '../hooks/useUser'

const validationSchema = yup.object({
  username: yup.string().required('please type username'),
  password: yup.string().required('please type password'),
})

const Login = () => {
  const { login, loading } = useUser();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values) => {
      const { username, password } = values;
      login(username, password).then(() => {
        history.push('/');
      });

    },
    validationSchema

  });
  return (
    <Box p={5} display="flex" justifyContent="center" alignItems="center" textAlign="center">
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4">Login</Typography>
        {loading && <CircularProgress />}
        <Box mb={3}>
          <TextField
            id="username"
            name="username"
            label="Username"
            style={{ width: 300 }}
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>
        <Box mb={3}>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            style={{ width: 300 }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        <Button type="submit" fullWidth variant="contained" color="primary" >Submit</Button>
      </form>
    </Box>
  )
}

export default Login
