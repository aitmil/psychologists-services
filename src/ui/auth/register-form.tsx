'use client';

import { Formik, Form } from 'formik';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { toast } from 'react-toastify';
import InputField from '@/ui/input-field';
import Button from '@/ui/button';
import {
  initialValuesRegister,
  registerValidationSchema,
} from '@/lib/validation';
import { auth } from '@/lib/firebase/firebase';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setUser } from '@/lib/redux/auth/slice';
import { RegisterFormValues } from '@/lib/definitions';

interface RegisterFormProps {
  onSubmit?: (values: RegisterFormValues) => void | Promise<void>;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: typeof initialValuesRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;
      await updateProfile(user, { displayName: values.name });

      const db = getDatabase();
      await set(ref(db, `users/${user.uid}`), {
        displayName: values.name,
        email: values.email,
        id: user.uid,
      });

      dispatch(
        setUser({
          name: values.name,
          email: values.email,
          id: user.uid,
        })
      );

      resetForm();

      if (onSubmit) {
        onSubmit(values);
      }

      toast.success(
        `Welcome, ${user.displayName}! You are now registered and logged in as a user!`
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating user:', error.message);
        toast.error(`Registration failed: ${error.message}`);
      } else {
        console.error('An unknown error occurred:', error);
        toast.error('An unknown error occurred.');
      }
    }
  };

  return (
    <>
      <h2 className="mb-4 md:mb-5 font-medium text-[30px] md:text-[35px] lg:text-[40px]  leading-[120%] tracking-[-0.02em] text-black">
        Registration
      </h2>
      <p className="mb-5 md:mb-8 lg:mb-10 text-[14px] md:text-[15px] lg:text-[16px]  leading-[125%] text-semi-text">
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <Formik
        initialValues={initialValuesRegister}
        validationSchema={registerValidationSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {() => (
          <Form>
            <InputField name="name" label="Name" type="text" />
            <InputField name="email" label="Email" type="email" />
            <InputField name="password" label="Password" type="password" />
            <Button
              type="submit"
              form
              variant="filled"
              className="w-full mt-[18px] md:mt-[20px] lg:mt-[22px]"
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
