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
import { SortBy } from '@/lib/definitions';

const sortBys: SortBy[] = [
  { id: 1, name: 'Name (A to Z)' },
  { id: 2, name: 'Name (Z to A)' },
  { id: 3, name: 'Price: Low to High' },
  { id: 4, name: 'Price: High to Low' },
  { id: 5, name: 'Highest rating first' },
];

interface SortMenuProps {
  onSortByChange: (sortBy: (typeof sortBys)[number]) => void;
}

export default function SortMenu({ onSortByChange }: SortMenuProps) {
  const [selected, setSelected] = useState(sortBys[0]);

  const handleChange = (sortBy: SortBy) => {
    setSelected(sortBy);
    onSortByChange(sortBy);
  };

  return (
    <div className="w-[226px] mb-8">
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
            'w-[var(--button-width)] rounded-[14px] border-0 bg-secondary-background py-3 mt-3 [--anchor-gap:var(--spacing-1)] focus:outline-none',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {sortBys.map(sortBy => (
            <ListboxOption
              key={sortBy.id}
              value={sortBy}
              className="group flex cursor-default items-center gap-2 py-1 px-[18px] select-none data-[focus]:bg-orange-transparent"
            >
              <div className="text-base leading-[125%] text-black">
                {sortBy.name}
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
