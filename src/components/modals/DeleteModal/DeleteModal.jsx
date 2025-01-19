'use client';
import Button from '@/components/UI/Button/Button';
import styles from './DeleteModal.module.scss';
import modalImgDelete from '@/app/images/delete_modal.svg';
import { useDispatch } from 'react-redux';
import { toggleDeleteModal } from '@/store/openModalSlice';

export default function DeleteModal({}) {
  const user = 'ABJ';
  const dispatch = useDispatch();
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img
          className={styles.modal__img}
          src={modalImgDelete.src}
          alt="delete"
        />
        <div className={styles.modal__textbox}>
          <div className={styles.modal__text}>
            Вы хотите удалить пользователя:
          </div>
          <div className={styles.modal__userName}>{user}</div>
        </div>
        <div className={styles.modal__btnWrap}>
          <Button btnName={'Удалить'} btnDeleteDark={true} />
          <Button
            linkHref={'/'}
            btnName={'Отменить'}
            btnDelete={true}
            onClick={() => dispatch(toggleDeleteModal())}
          />
        </div>
      </div>
    </div>
  );
}
