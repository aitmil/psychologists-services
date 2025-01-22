'use client';

import React from 'react';

import Modal, { ModalProps } from '@/app/ui/modal';
import AppointmentForm from './appointment-form';

export default function AppointmentFormModal({ onClose, ...rest }: ModalProps) {
  return (
    <Modal {...rest} onClose={onClose}>
      <AppointmentForm onSubmit={() => onClose()} />
    </Modal>
  );
}
