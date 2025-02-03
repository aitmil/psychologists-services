'use client';

import React from 'react';

import Modal, { ModalProps } from '@/ui/modal';
import AppointmentForm from '@/ui/psychologists/appointment-form';

export default function AppointmentFormModal({ onClose, ...rest }: ModalProps) {
  return (
    <Modal {...rest} onClose={onClose}>
      <AppointmentForm onSubmit={() => onClose()} />
    </Modal>
  );
}
