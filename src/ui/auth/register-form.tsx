'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import InputField from '@/ui/input-field';
import Button from '@/ui/button';
import {
  initialValuesRegister,
  registerValidationSchema,
} from '@/lib/validation';
import { auth } from '@/lib/firebase/firebase';
import { setUser } from '@/lib/redux/users/slice';
import { RegisterFormValues } from '@/lib/definitions';

interface RegisterFormProps {
  onSubmit?: (values: RegisterFormValues) => void | Promise<void>;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const router = useRouter();
  const dispatch = useDispatch();

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
      });

      dispatch(
        setUser({
          name: values.name,
          email: values.email,
        })
      );

      resetForm();
      router.back();

      if (onSubmit) {
        onSubmit(values);
      }

      alert(
        `Welcome, ${user.displayName}! You are now registered and logged in as a user!`
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating user:', error.message);
        alert(`Registration failed: ${error.message}`);
      } else {
        console.error('An unknown error occurred:', error);
        alert('An unknown error occurred.');
      }
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
              className="w-full mt-[22px]"
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
