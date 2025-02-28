/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import LoginForm from '@/ui/auth/login-form';
import Modal, { ModalProps } from '@/ui/modal';
import IconButton from '@/ui/icon-button';

export default function LoginFormModal({ onClose, ...rest }: ModalProps) {
  const [isModal, setIsModal] = useState<boolean>(true);

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
      <LoginForm
        isModal={true}
        closeModal={() => {
          onClose();
          setIsModal(false);
        }}
      />
    </Modal>
  );
}
