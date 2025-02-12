import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik, Form } from 'formik';

import InputField from '@/ui/input-field';
import Button from '@/ui/button';
import { initialValuesLogin, loginValidationSchema } from '@/lib/validation';
import { auth } from '@/lib/firebase/firebase';
import { LoginFormValues } from '@/lib/definitions';

interface LoginFormProps {
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const router = useRouter();

  const handleSubmit = async (
    values: typeof initialValuesLogin,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      resetForm();

      router.back();

      if (onSubmit) {
        onSubmit(values);
      }

      alert(
        `Welcome back, ${user.displayName}! You are now logged in as a user!`
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error login user:', error.message);
        alert(`Login failed: ${error.message}`);
      } else {
        console.error('An unknown error occurred:', error);
        alert('An unknown error occurred.');
      }
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
        initialValues={initialValuesLogin}
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
