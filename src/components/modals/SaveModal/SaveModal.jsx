'use client';
import { useDispatch } from 'react-redux';
import Button from '@/components/UI/Button/Button';
import styles from './SaveModal.module.scss';
import modalImgSave from '@/app/images/save_modal.svg';
import { toggleSaveModal } from '@/store/openModalSlice';

export default function SaveModal({}) {
  const dispatch = useDispatch();
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img className={styles.modal__img} src={modalImgSave.src} alt="save" />
        <div className={styles.modal__textbox}>Данные успешно сохранены</div>
        <div className={styles.modal__btnWrap}>
          <Button
            btnName={'Закрыть'}
            btnGrey={true}
            linkHref="/"
            onClick={() => dispatch(toggleSaveModal())}
          />
        </div>
      </div>
    </div>
  );
}
