import { db } from '@/lib/firebase/firebase';
import {
  ref,
  query,
  orderByChild,
  limitToFirst,
  limitToLast,
  get,
  Query,
  startAfter,
  endBefore,
  push,
  set,
} from 'firebase/database';
import { Psychologist } from '@/lib/definitions';

export const fetchData = async (
  path: string,
  sortBy: string | null = null,
  lastValue: string | number | null = null,
  limit: number = 3
): Promise<{
  data: Psychologist[];
  lastValue: string | number | null;
  hasMore: boolean;
}> => {
  try {
    const dataRef = ref(db, path);
    let dataQuery: Query;
    let orderField: keyof Psychologist = 'name';

    switch (sortBy) {
      case 'Name (A to Z)':
      case 'Name (Z to A)':
        orderField = 'name';
        break;
      case 'Price: Low to High':
      case 'Price: High to Low':
        orderField = 'price_per_hour';
        break;
      case 'Highest rating first':
        orderField = 'rating';
        break;
      default:
        orderField = 'name';
        break;
    }

    if (
      sortBy === 'Name (Z to A)' ||
      sortBy === 'Price: High to Low' ||
      sortBy === 'Highest rating first'
    ) {
      dataQuery = query(
        dataRef,
        orderByChild(orderField),
        limitToLast(limit + 1)
      );
    } else {
      dataQuery = query(
        dataRef,
        orderByChild(orderField),
        limitToFirst(limit + 1)
      );
    }

    if (lastValue !== null) {
      if (
        sortBy === 'Name (Z to A)' ||
        sortBy === 'Price: High to Low' ||
        sortBy === 'Highest rating first'
      ) {
        dataQuery = query(dataQuery, endBefore(lastValue));
      } else {
        dataQuery = query(dataQuery, startAfter(lastValue));
      }
    }

    const snapshot = await get(dataQuery);
    const data = snapshot.val();

    if (!data) {
      return {
        data: [],
        lastValue: null,
        hasMore: false,
      };
    }

    const dataArray: Psychologist[] = Object.keys(data).map(key => ({
      id: key,
      ...data[key],
    }));

    const sortedData = [...dataArray];

    switch (sortBy) {
      case 'Name (A to Z)':
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name (Z to A)':
        sortedData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Price: Low to High':
        sortedData.sort((a, b) => a.price_per_hour - b.price_per_hour);
        break;
      case 'Price: High to Low':
        sortedData.sort((a, b) => b.price_per_hour - a.price_per_hour);
        break;
      case 'Highest rating first':
        sortedData.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    const hasMore = sortedData.length > limit;
    const newLastValue = hasMore
      ? sortedData[limit - 1]?.[orderField] || null
      : null;

    return {
      data: hasMore ? sortedData.slice(0, limit) : sortedData,
      lastValue: newLastValue,
      hasMore,
    };
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};

export const fetchPsychologistById = async (
  id: string
): Promise<Psychologist | null> => {
  try {
    const psychologistRef = ref(db, `psychologists/${id}`);
    const snapshot = await get(psychologistRef);

    if (snapshot.exists()) {
      const psychologist: Psychologist = snapshot.val();
      return { ...psychologist };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching psychologist by id:', error);
    throw error;
  }
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

export const fetchBusyTimes = async (
  psychologistId: string
): Promise<string[]> => {
  const today = new Date().toISOString().split('T')[0];

  const appointmentsRef = ref(
    db,
    `psychologists/${psychologistId}/appointments`
  );
  const snapshot = await get(appointmentsRef);

  if (snapshot.exists()) {
    const appointments: { [key: string]: { time: string } } = snapshot.val();

    const times = Object.values(appointments)
      .filter(appointment => {
        const appointmentDate = new Date(appointment.time)
          .toISOString()
          .split('T')[0];
        return appointmentDate === today;
      })
      .map(appointment => {
        const utcTime = new Date(appointment.time);
        const localTime = utcTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        return localTime;
      });

    return times;
  }

  return [];
};
