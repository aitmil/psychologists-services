import React from 'react';
import { Formik, Form } from 'formik';

import InputField from '@/ui/input-field';
import Button from '@/ui/button';
import { appointmentValidationSchema } from '@/lib/validation';

export type AppointmentFormValues = {
  name: string;
  phone: string;
  time: string;
  email: string;
  comment: string;
};

const initialValues: AppointmentFormValues = {
  name: '',
  phone: '',
  time: '',
  email: '',
  comment: '',
};

interface AppointmentFormProps {
  onSubmit?: (values: AppointmentFormValues) => void | Promise<void>;
}

export default function AppointmentForm({ onSubmit }: AppointmentFormProps) {
  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form values:', values);

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <div className="w-full max-w-[438px]">
      <h2 className="mb-5 font-medium text-[40px] leading-[120%] tracking-[-0.02em] text-black">
        Make an appointment with a psychologists
      </h2>
      <p className="mb-10 text-[16px] leading-[125%] text-semi-text">
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={appointmentValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <InputField name="name" label="Name" type="text" />
          <div className="flex gap-2">
            <InputField name="phone" label="+380" type="text" />
            <InputField name="time" label="00:00" type="text" />
          </div>
          <InputField name="email" label="Email" type="email" />
          <InputField name="comment" label="Comment" type="text" />
          <Button
            type="submit"
            form
            variant="filled"
            className="w-full mt-[22px]"
          >
            Send
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
