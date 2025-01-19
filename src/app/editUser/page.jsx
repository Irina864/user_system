import Form from '@/components/Form/Form';
import styles from './page.module.scss';
import Link from 'next/link';

export default function EditForm() {
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <div className={styles.title__box}>
          <h2 className={styles.title}>Редактировать пользователя</h2>
          <Link href="/" className={styles.close}>
            <div className={styles.cross_line}></div>
            <div
              className={`${styles.cross_line} ${styles.another_line}`}
            ></div>
          </Link>
        </div>
        <div className={styles.form__items}>
          <Form editForm={true} />
        </div>
      </div>
    </div>
  );
}
