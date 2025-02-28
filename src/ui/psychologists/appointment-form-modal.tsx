'use client';

import React from 'react';

import Modal, { ModalProps } from '@/ui/modal';
import AppointmentForm from '@/ui/psychologists/appointment-form';
import IconButton from '@/ui/icon-button';

export default function AppointmentFormModal({ onClose, ...rest }: ModalProps) {
  return (
    <Modal
      {...rest}
      onClose={onClose}
      className="md:max-w-[560px] lg:max-w-[600px]"
    >
      <IconButton
        icon="icon-cross"
        onClick={onClose}
        title="Close Appointment Form Modal"
        className="absolute top-5 right-5 bg-transparent stroke-black hover:stroke-gray-600 active:stroke-gray-600"
        iconClassName="size-8"
      />
      <AppointmentForm onSubmit={() => onClose()} />
    </Modal>
  );
}
