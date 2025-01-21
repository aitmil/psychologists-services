import React from 'react';
import { Formik, Form } from 'formik';

import InputField from '../input-field';
import Button from '../button';
import { registerValidationSchema } from '@/app/utils/validation';

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

const initialValues: RegisterFormValues = { name: '', email: '', password: '' };

interface RegisterFormProps {
  onSubmit?: (values: RegisterFormValues) => void | Promise<void>;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form values:', values);

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <div className="w-full max-w-[438px]">
      <h2 className="mb-5 font-medium text-[40px] leading-[120%] tracking-[-0.02em] text-black">
        Registration
      </h2>
      <p className="mb-10 text-[16px] leading-[125%] text-semi-text">
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <InputField name="name" label="Name" type="text" />
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
