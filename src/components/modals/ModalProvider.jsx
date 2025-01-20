'use client';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '@/components/modals/DeleteModal/DeleteModal';
import SaveModal from '@/components/modals/SaveModal/SaveModal';
import ServerErrorModal from '@/components/modals/ServerErrorModal/ServerErrorModal';
import { useEffect } from 'react';
import { openServerErrorModal } from '@/store/openModalSlice';

export default function ModalProvider() {
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.openModal);
  const fetchError = useSelector((state) => state.user.fetchError);
  useEffect(() => {
    if (fetchError) {
      dispatch(openServerErrorModal());
    }
  }, [fetchError]);
  return (
    <div>
      {openModal.deleteModal && <DeleteModal />}
      {openModal.saveModal && <SaveModal />}
      {openModal.serverErrorModal && <ServerErrorModal />}
    </div>
  );
}
