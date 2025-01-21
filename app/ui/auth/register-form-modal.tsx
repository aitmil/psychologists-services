'use client';

import React from 'react';

import RegisterForm from './register-form';
import Modal, { ModalProps } from '@/app/ui/modal';

export default function RegisterFormModal({ onClose, ...rest }: ModalProps) {
  return (
    <Modal {...rest} onClose={onClose}>
      <RegisterForm onSubmit={() => onClose()} />
    </Modal>
  );
}
