'use client';

import React from 'react';

import LoginForm from './login-form';
import Modal, { ModalProps } from '@/app/ui/modal';

export default function LoginFormModal({ onClose, ...rest }: ModalProps) {
  return (
    <Modal {...rest} onClose={onClose}>
      <LoginForm onSubmit={() => onClose()} />
    </Modal>
  );
}
