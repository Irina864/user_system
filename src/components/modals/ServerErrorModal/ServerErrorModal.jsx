'use client';
import { useDispatch } from 'react-redux';
import Button from '@/components/UI/Button/Button';
import styles from './ServerErrorModal.module.scss';
import modalImgServerError from '@/app/images/server_error_modal.svg';
import { toggleServerErrorModal } from '@/store/openModalSlice';
import { updateUserKey } from '@/store/usersSlice';

export default function ServerErrorModal({}) {
  const dispatch = useDispatch();
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img
          className={styles.modal__img}
          src={modalImgServerError.src}
          alt="Server Error"
        />
        <div className={styles.modal__textbox}>Произошла ошибка на сервере</div>
        <div className={styles.modal__btnWrap}>
          <Button
            btnName={'Закрыть'}
            btnDark={true}
            linkHref={'/'}
            onClick={() => {
              dispatch(updateUserKey({ key: 'fetchError', data: false }));
              dispatch(toggleServerErrorModal());
            }}
          />
        </div>
      </div>
    </div>
  );
}
