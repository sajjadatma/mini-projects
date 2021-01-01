import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Alert, Button, Form } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Cookies from 'js-cookie';
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

function Login() {
  const history = useHistory();
  const [alert, setAlert] = useState(false);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 5,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
    },
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setAlert(true);
      Cookies.set('userToken', JSON.stringify(values), { expires: 1 });
      history.push('/dashboard');
    },
  });
  return (
    <div className='h-full  flex justify-center items-center flex-col'>
      <div className='w-1/3 bg-white p-5 rounded-md border border-gray-400 shadow-xl'>
        <h1 className='text-2xl text-teal-600 text-center'>Login</h1>
        {alert ? (
          <Alert closable message='Success Text' type='success' />
        ) : null}
        <Form {...formItemLayout} onFinish={formik.handleSubmit}>
          <Form.Item
            label='Email'
            name='email'
            help={formik.touched.email && formik.errors.email}
            validateStatus={
              formik.touched.email && Boolean(formik.errors.email)
                ? 'error'
                : null
            }
          >
            <Input
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            label='Password'
            id='password'
            name='password'
            help={formik.touched.password && formik.errors.password}
            validateStatus={
              formik.touched.password && Boolean(formik.errors.password)
                ? 'error'
                : null
            }
          >
            <Input
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Button className=' ml-auto block' type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
