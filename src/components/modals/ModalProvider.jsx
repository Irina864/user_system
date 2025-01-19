'use client';
import { useSelector } from 'react-redux';
import DeleteModal from '@/components/modals/DeleteModal/DeleteModal';
import SaveModal from '@/components/modals/SaveModal/SaveModal';
import ServerErrorModal from '@/components/modals/ServerErrorModal/ServerErrorModal';

export default function ModalProvider() {
  const openModal = useSelector((state) => state.openModal);
  return (
    <div>
      {openModal.deleteModal && <DeleteModal />}
      {openModal.saveModal && <SaveModal />}
      {openModal.serverErrorModal && <ServerErrorModal />}
    </div>
  );
}
