import Form from '@/components/Form/Form';
import styles from './page.module.scss';

export default function AddUser() {
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <div className={styles.title__box}>
          <h2 className={styles.title}>Добавить нового пользователя</h2>
          <div className={styles.close}>
            <div className={styles.cross_line}></div>
            <div
              className={`${styles.cross_line} ${styles.another_line}`}
            ></div>
          </div>
        </div>
        <Form addForm={true} />
      </div>
    </div>
  );
}
