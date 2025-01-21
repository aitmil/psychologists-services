import React from 'react';
import { Formik, Form } from 'formik';

import InputField from '../input-field';
import Button from '../button';
import { loginValidationSchema } from '@/app/utils/validation';

export type LoginFormValues = { email: string; password: string };

const initialValues: LoginFormValues = { email: '', password: '' };

interface LoginFormProps {
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form values:', values);

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <div className="w-full max-w-[438px]">
      <h2 className="mb-5 font-medium text-[40px] leading-[120%] tracking-[-0.02em] text-black">
        Log In
      </h2>
      <p className="mb-10 text-[16px] leading-[125%] text-semi-text">
        Welcome back! Please enter your credentials to access your account.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <InputField name="email" label="Email" type="email" />
          <InputField name="password" label="Password" type="password" />
          <Button
            type="submit"
            form
            variant="filled"
            className="w-full mt-[22px]"
          >
            Log In
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
