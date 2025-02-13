import { db } from './firebase';
import { ref, set, push } from 'firebase/database';

export const saveAppointmentToUser = async (
  userId: string,
  psychologistId: string,
  time: string
): Promise<void> => {
  const appointmentsRef = ref(db, `users/${userId}/appointments`);
  const newAppointmentRef = push(appointmentsRef);
  await set(newAppointmentRef, {
    psychologistId,
    time,
  });
};

export const saveAppointmentToPsychologist = async (
  psychologistId: string,
  userId: string,
  time: string
): Promise<void> => {
  const appointmentsRef = ref(
    db,
    `psychologists/${psychologistId}/appointments`
  );
  const newAppointmentRef = push(appointmentsRef);
  await set(newAppointmentRef, {
    userId,
    time,
  });
};
