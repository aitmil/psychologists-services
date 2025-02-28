import { Formik, Form } from 'formik';
import InputField from '@/ui/input-field';
import Button from '@/ui/button';
import { initialValuesLogin, loginValidationSchema } from '@/lib/validation';
import { useAuth } from '@/lib/hooks/useAuth';

interface LoginFormProps {
  isModal?: boolean;
  closeModal?: () => void;
}

export default function LoginForm({ isModal, closeModal }: LoginFormProps) {
  const { signInWithEmail } = useAuth({
    isModal,
    closeModal,
  });

  const handleSubmit = async (
    values: typeof initialValuesLogin,
    { resetForm }: { resetForm: () => void }
  ) => {
    await signInWithEmail(values.email, values.password);
    resetForm();
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
    </>
  );
}
