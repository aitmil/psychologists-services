import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import Image from 'next/image';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import InputField from '@/ui/input-field';
import Button from '@/ui/button';
import { initialValuesLogin, loginValidationSchema } from '@/lib/validation';
import { auth } from '@/lib/firebase/firebase';
import { LoginFormValues } from '@/lib/definitions';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setUser } from '@/lib/redux/auth/slice';

interface LoginFormProps {
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
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

      if (onSubmit) {
        onSubmit(values);
      }

      router.replace('/');

      toast.success(`Welcome back, ${user.displayName || 'User'}!`);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error login user:', error.message);
        toast.error(`Login failed: ${error.message}`);
      } else {
        console.error('An unknown error occurred:', error);
        toast.error('An unknown error occurred.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        setUser({
          name: user.displayName || 'User',
          email: user.email || '',
          id: user.uid,
        })
      );

      if (onSubmit) {
        onSubmit({ email: user.email || '', password: '' });
      }

      router.replace('/');

      toast.success(`Welcome back, ${user.displayName || 'User'}!`);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error signing in with Google:', error.message);
        toast.error(`Google Sign-In failed. Try to reload this page.`);
      } else {
        console.error('An unknown error occurred:', error);
        toast.error('An unknown error occurred.');
      }
    }
  };

  return (
    <>
      <h2 className="mb-4 md:mb-5 font-medium text-[30px] md:text-[35px] lg:text-[40px] leading-[120%] tracking-[-0.02em] text-black">
        Log In
      </h2>
      <p className="mb-5 md:mb-8 lg:mb-10 text-[14px] md:text-[15px] lg:text-[16px] leading-[125%] text-semi-text">
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
            className="w-full mt-[18px] md:mt-[20px] lg:mt-[22px]"
          >
            Log In
          </Button>
        </Form>
      </Formik>

      <div className="mt-4 text-center">or</div>

      <Button
        type="button"
        variant="outlined"
        className="w-full mt-4 flex items-center justify-center"
        onClick={handleGoogleSignIn}
      >
        <Image
          src="/google-icon.svg"
          alt="Google icon"
          width={24}
          height={24}
        />
        <span className="ml-2">Sign in with Google</span>
      </Button>
    </>
  );
}
