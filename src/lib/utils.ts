import { AppointmentFormValues } from '@/lib/definitions';

export const trimValuesAppointment = (values: AppointmentFormValues) => {
  return {
    ...values,
    name: values.name.trim(),
    phone: values.phone.trim(),
    time: values.time.replace(/\s/g, ''),
    email: values.email.trim(),
    comment: values.comment.trim(),
  };
};

export const convertTimeToUTC = (time: string): string => {
  const currentDate = new Date();
  const [hours, minutes] = time.split(':');

  currentDate.setHours(parseInt(hours, 10));
  currentDate.setMinutes(parseInt(minutes, 10));
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  return currentDate.toISOString();
};
