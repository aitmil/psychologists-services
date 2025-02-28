'use client';

import React, { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

export interface ModalProps {
  children?: React.ReactNode;
  show: boolean;
  onClose: () => void;
  className?: string;
}

export default function Modal({
  show,
  children,
  onClose,
  className,
}: ModalProps) {
  return (
    <Transition as={Fragment} show={show}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center"
        onClose={onClose}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-overlay bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <DialogPanel
          className={`w-full max-w-auto h-full md:h-auto flex flex-col md:justify-center relative transform overflow-hidden pt-20 sm:pt-20 p-[22px] sm:p-[44px] lg:p-[64px] mx-auto md:rounded-[20px] lg:rounded-[30px] bg-main-background shadow-xl transition-all ${className}`}
        >
          {children}
        </DialogPanel>
      </Dialog>
    </Transition>
  );
}
