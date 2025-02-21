'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import Avatar from '@/ui/psychologists/avatar';
import InputField from '@/ui/input-field';
import TimeField from '@/ui/time-field';
import Button from '@/ui/button';
import { SmallCardSkeleton } from '@/ui/skeletons';
import { selectPsychologist } from '@/lib/redux/psychologists/selectors';
import { fetchPsychologist } from '@/lib/redux/psychologists/operations';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { saveAppointmentToUser } from '@/lib/firebase/services/user';
import {
  fetchBusyTimes,
  saveAppointmentToPsychologist,
} from '@/lib/firebase/services/psychologists';
import { convertTimeToUTC, trimValuesAppointment } from '@/lib/utils';
import { AppointmentFormValues } from '@/lib/definitions';
import {
  appointmentValidationSchema,
  initialValuesAppointment,
} from '@/lib/validation';
import { getAuth } from 'firebase/auth';

interface AppointmentFormProps {
  onSubmit?: (values: AppointmentFormValues) => void | Promise<void>;
}

export default function AppointmentForm({ onSubmit }: AppointmentFormProps) {
  const params = useParams();
  const { id } = params;
  const [busyTimes, setBusyTimes] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchPsychologist(id as string));
  }, [dispatch, id]);

  const { psychologist, loading } = useAppSelector(selectPsychologist);

  useEffect(() => {
    const loadBusyTimes = async () => {
      if (typeof id === 'string') {
        const times = await fetchBusyTimes(id);
        setBusyTimes(times);
      } else {
        console.error('Invalid psychologist ID');
      }
    };
    loadBusyTimes();
  }, [id]);

  const handleSubmit = async (values: typeof initialValuesAppointment) => {
    const trimmedValues = trimValuesAppointment(values);
    const currentUser = getAuth().currentUser;
    if (!currentUser) {
      throw new Error('User is not authenticated');
    }
    const userId = currentUser.uid;
    const timeUTC = convertTimeToUTC(trimmedValues.time);

    try {
      await Promise.all([
        saveAppointmentToUser(userId, id as string, timeUTC),
        saveAppointmentToPsychologist(id as string, userId, timeUTC),
      ]);

      if (onSubmit) {
        onSubmit(trimmedValues);
      }

      router.replace('/');

      toast.success('Appointment successfully created!');
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('An error occurred while creating the appointment');
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

      {loading && !psychologist && <SmallCardSkeleton />}
      {!loading && psychologist && (
        <div className="flex gap-[14px] mb-10">
          <Avatar imageUrl={psychologist.avatar_url} size={44} />
          <div>
            <h3 className="mb-1 text-[12px] font-medium leading-[133%] text-light-color">
              Your psychologist
            </h3>
            <p className="text-[16px] font-medium leading-[150%] text-black">
              {psychologist.name}
            </p>
          </div>
        </div>
      )}

      <Formik
        initialValues={initialValuesAppointment}
        validationSchema={appointmentValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <InputField name="name" label="Name" type="text" />
          <div className="flex gap-2">
            <InputField name="phone" label="+380" type="text" />
            <TimeField name="time" label="Time" busyTimes={busyTimes} />
          </div>
          <InputField name="email" label="Email" type="email" />
          <InputField
            name="comment"
            label="Comment"
            as="textarea"
            rows={4}
            className="h-[116px]"
          />
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
