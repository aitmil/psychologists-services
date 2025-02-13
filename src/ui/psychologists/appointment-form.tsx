'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Formik, Form } from 'formik';
import { getAuth } from 'firebase/auth';

import InputField from '@/ui/input-field';
import TimeField from '@/ui/time-field';
import Button from '@/ui/button';
import Avatar from '@/ui/psychologists/avatar';

import { useAppSelector } from '@/lib/redux/hooks';
import {
  appointmentValidationSchema,
  initialValuesAppointment,
} from '@/lib/validation';
import { selectPsychologists } from '@/lib/redux/psychologists/selectors';
import { AppointmentFormValues } from '@/lib/definitions';
import {
  saveAppointmentToPsychologist,
  saveAppointmentToUser,
} from '@/lib/firebase/save-appointment-service';
import { convertTimeToUTC, trimValuesAppointment } from '@/lib/utils';
import { get, ref } from 'firebase/database';
import { db } from '@/lib/firebase/firebase';

interface AppointmentFormProps {
  onSubmit?: (values: AppointmentFormValues) => void | Promise<void>;
}

export default function AppointmentForm({ onSubmit }: AppointmentFormProps) {
  const params = useParams();
  const { id } = params;
  const [busyTimes, setBusyTimes] = useState<string[]>([]);

  const psychologist = useAppSelector(selectPsychologists).find(
    psych => psych.id == id
  );

  useEffect(() => {
    const fetchBusyTimes = async () => {
      const appointmentsRef = ref(db, `psychologists/${id}/appointments`);
      const snapshot = await get(appointmentsRef);
      if (snapshot.exists()) {
        const appointments: { [key: string]: { time: string } } =
          snapshot.val();
        const times = Object.values(appointments).map(appointment => {
          const utcTime = new Date(appointment.time);
          const localTime = utcTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          return localTime;
        });
        setBusyTimes(times);
      }
    };

    fetchBusyTimes();
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

      alert('Appointment successfully created!');
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('An error occurred while creating the appointment.');
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

      {psychologist && (
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
