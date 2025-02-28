import Image from 'next/image';
import { Formik, Form } from 'formik';
import InputField from '@/ui/input-field';
import Button from '@/ui/button';
import {
  initialValuesRegister,
  registerValidationSchema,
} from '@/lib/validation';
import { useAuth } from '@/lib/hooks/useAuth';

interface RegisterFormProps {
  isModal?: boolean;
  closeModal?: () => void;
}

export default function RegisterForm({
  isModal,
  closeModal,
}: RegisterFormProps) {
  const { registerWithEmail, signInWithGoogle } = useAuth({
    isModal,
    closeModal,
  });

  const handleSubmit = async (
    values: typeof initialValuesRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    await registerWithEmail(values.email, values.password);
    resetForm();
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

      <div className="mt-4 text-center">or</div>

      <Button
        type="button"
        variant="outlined"
        className="w-full mt-4 flex items-center justify-center"
        onClick={signInWithGoogle}
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
