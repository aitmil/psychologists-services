import React, { useState } from 'react';
import { useField } from 'formik';
import Icon from '@/ui/icon';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';

const availableTimes = [
  '09 : 00',
  '09 : 30',
  '10 : 00',
  '10 : 30',
  '11 : 00',
  '11 : 30',
  '12 : 00',
  '12 : 30',
  '14 : 00',
  '14 : 30',
  '15 : 00',
  '15 : 30',
  '16 : 00',
  '16 : 30',
];

interface TimeFieldProps {
  label: string;
  name: string;
  busyTimes: string[];
}

const TimeField: React.FC<TimeFieldProps> = ({ name, busyTimes }) => {
  const [, meta, helpers] = useField(name);
  const [selectedTime, setSelectedTime] = useState(availableTimes[0]);

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    helpers.setValue(time);
  };

  const formattedBusyTimes = busyTimes.map(time => time.replace(':', ' : '));

  console.log(formattedBusyTimes);

  return (
    <div className="w-full mb-[18px]">
      <div className="relative w-full">
        <Listbox value={selectedTime} onChange={handleTimeChange}>
          <ListboxButton
            className={clsx(
              'relative block w-full border rounded-xl bg-white py-4 pr-[18px] pl-[18px] text-left text-base text-black transition duration-100',
              'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
              meta.touched && meta.error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-border-color'
            )}
          >
            {selectedTime}
            <Icon
              name="icon-clock"
              className="group pointer-events-none absolute top-[18px] right-4 size-5 stroke-0 stroke-black fill-white"
            ></Icon>
          </ListboxButton>
          <ListboxOptions
            anchor="bottom end"
            transition
            className={clsx(
              'w-[151px] rounded-xl border bg-secondary-background py-4 mt-2 [--anchor-gap:var(--spacing-1)] focus:outline-none',
              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
            )}
          >
            <div className="flex justify-center mb-4">
              <p>Meeting time</p>
            </div>
            <div className="h-[140px] overflow-y-auto">
              {availableTimes.map(time => (
                <ListboxOption
                  key={time}
                  value={time}
                  disabled={formattedBusyTimes.includes(time)}
                  className={clsx(
                    'group flex cursor-default items-center justify-center gap-2 py-1 px-[18px] select-none data-[focus]:bg-orange-transparent',
                    formattedBusyTimes.includes(time)
                      ? 'text-light-color'
                      : 'text-black'
                  )}
                >
                  <div
                    className={clsx(
                      'text-base leading-[125%] mb-[6px]',
                      formattedBusyTimes.includes(time)
                        ? 'text-light-color'
                        : 'text-black'
                    )}
                  >
                    {time}
                  </div>
                </ListboxOption>
              ))}
            </div>
          </ListboxOptions>
        </Listbox>
      </div>

      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default TimeField;
