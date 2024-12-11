import React from 'react';
import Modal from 'react-modal';
import clsx from 'clsx';

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  handleCloseModal: () => void;
  children: React.ReactNode;
}

Modal.setAppElement('#root');

export default function CustomModal({
  isOpen,
  onRequestClose,
  contentLabel,
  handleCloseModal,
  children,
}: CustomModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className={clsx(
        'bg-secondary-background max-w-[599px] mx-auto p-[64px] rounded-[30px] relative'
      )}
      overlayClassName={clsx(
        'bg-overlay fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'
      )}
    >
      <button
        type="button"
        onClick={handleCloseModal}
        className="absolute top-[16px] right-[16px] text-white bg-orange-light hover:bg-orange-dark px-[12px] py-[6px] rounded-full"
      >
        Close
      </button>
      {children}
    </Modal>
  );
}
