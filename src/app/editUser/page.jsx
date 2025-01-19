'use client';
import { useDispatch, useSelector } from 'react-redux';
import { toggleServerErrorModal } from '@/store/openModalSlice';
import Form from '@/components/Form/Form';
import styles from './page.module.scss';

export default function EditForm() {
  const usersInfo = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(toggleServerErrorModal());
  }, [usersInfo.fetchError]);
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <div className={styles.title__box}>
          <h2 className={styles.title}>Редактировать пользователя</h2>
          <div className={styles.close}>
            <div className={styles.cross_line}></div>
            <div
              className={`${styles.cross_line} ${styles.another_line}`}
            ></div>
          </div>
        </div>
        <div className={styles.form__items}>
          <Form editForm={true} />
        </div>
      </div>
    </div>
  );
}
