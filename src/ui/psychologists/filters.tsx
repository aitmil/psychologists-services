'use client';

import { useState } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import Icon from '@/ui/icon';
import { Filter } from '@/lib/definitions';

const filters: Filter[] = [
  { id: 1, name: 'A to Z' },
  { id: 2, name: 'Z to A' },
  { id: 3, name: 'Less than 10$' },
  { id: 4, name: 'Greater than 10$' },
  { id: 5, name: 'Popular' },
  { id: 6, name: 'Not popular' },
  { id: 7, name: 'Show all' },
];

interface FiltersProps {
  onFilterChange: (filter: (typeof filters)[number]) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [selected, setSelected] = useState(filters[0]);

  const handleChange = (filter: Filter) => {
    setSelected(filter);
    onFilterChange(filter);
  };

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-sm leading-[129%] text-light-color font-medium">
        Filters
      </h2>
      <div className="w-[226px]">
        <Listbox value={selected} onChange={handleChange}>
          <ListboxButton
            className={clsx(
              'relative block w-full border-0 rounded-[14px] bg-orange-light py-[14px] pr-[14px] pl-[18px] text-left text-base leading-[125%] text-main-background transition duration-100',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-orange-dark hover:bg-orange-dark'
            )}
          >
            {selected.name}
            <Icon
              name="icon-chevron-down"
              className="group pointer-events-none absolute top-4 right-[14px] size-4 stroke-0 stroke-main-background fill-current"
            ></Icon>
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              'w-[var(--button-width)] rounded-[14px] border-0 bg-secondary-background py-[6px] mt-2 [--anchor-gap:var(--spacing-1)] focus:outline-none',
              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
            )}
          >
            {filters.map(filter => (
              <ListboxOption
                key={filter.id}
                value={filter}
                className="group flex cursor-default items-center gap-2 py-1 px-[18px] select-none data-[focus]:bg-orange-transparent"
              >
                <div className="text-base leading-[125%] text-black">
                  {filter.name}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </div>
  );
}
