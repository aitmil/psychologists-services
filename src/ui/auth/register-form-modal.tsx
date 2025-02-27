'use client';

import React from 'react';
import RegisterForm from '@/ui/auth/register-form';
import Modal, { ModalProps } from '@/ui/modal';
import IconButton from '@/ui/icon-button';

export default function RegisterFormModal({ onClose, ...rest }: ModalProps) {
  return (
    <Modal
      {...rest}
      onClose={onClose}
      className="md:max-w-[526px] lg:max-w-[566px]"
    >
      <IconButton
        icon="icon-cross"
        onClick={onClose}
        title="Close Mobile Menu"
        className="absolute top-5 right-5 stroke-black hover:stroke-gray-600 active:stroke-gray-600"
        iconClassName="size-8"
      />
      <RegisterForm onSubmit={() => onClose()} />
    </Modal>
  );
}
